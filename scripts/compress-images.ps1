# Recompress oversized JPEGs in place (quality 75), preserving EXIF orientation.
# Originals are backed up in FOT-backup-*.zip. Skips any file that doesn't shrink.
Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)

function Get-Orientation($img) {
  foreach ($frame in $img.PropertyItems) {
    if ($frame.Id -eq 0x0112 -and $frame.Len -ge 2) { return [BitConverter]::ToUInt16($frame.Value, 0) }
  }
  return 1
}

$report = @()
$assetsRoot = Join-Path (Split-Path $PSScriptRoot -Parent) 'assets'
Get-ChildItem $assetsRoot -Recurse -Include *.jpeg, *.jpg | Where-Object { $_.Length -gt 400KB } | ForEach-Object {
  $file = $_
  $tmp = "$($file.FullName).tmp.jpg"
  try {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $orientation = Get-Orientation $img
    $bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
    $g.Dispose()

    # Apply EXIF orientation so we can safely drop the metadata tag
    switch ($orientation) {
      3 { $bmp.RotateFlip('Rotate180FlipNone') }
      6 { $bmp.RotateFlip('Rotate90FlipNone') }
      8 { $bmp.RotateFlip('Rotate270FlipNone') }
      2 { $bmp.RotateFlip('FlipXNone') }
      4 { $bmp.RotateFlip('FlipXNone'); $bmp.RotateFlip('Rotate180FlipNone') }
      5 { $bmp.RotateFlip('Rotate90FlipNone'); $bmp.RotateFlip('FlipXNone') }
      7 { $bmp.RotateFlip('Rotate270FlipNone'); $bmp.RotateFlip('FlipXNone') }
    }

    $bmp.Save($tmp, $jpegCodec, $params)
    $img.Dispose(); $bmp.Dispose()

    $newLen = (Get-Item $tmp).Length
    if ($newLen -lt $file.Length) {
      Move-Item $tmp $file.FullName -Force
      $report += ("{0}: {1:N0} -> {2:N0} bytes ({3:P0})" -f $file.Name, $file.Length, $newLen, (1 - $newLen / $file.Length))
    } else {
      Remove-Item $tmp -Force
      $report += ("{0}: kept original (no gain)" -f $file.Name)
    }
  } catch {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    $report += ("{0}: SKIPPED ({1})" -f $file.Name, $_.Exception.Message)
  }
}
$report
