# moments-exif-datetime-correction

A tool to correct the original datetime exif data from images backed up from
Moments (by Facebook) using exiftool. When I backed up all my data I discovered
that my images didn't have the correct date and time exif anymore. But I could
find the correct data inside the `moments.json` file.

To use it you have to pass two arguments, the JSON file path and the base path
with the backup folder:

```shell
node moments-exif-datetime-correction "/Users/user/photos_and_videos/moments/moments.json" "/Users/user/moments"
```

You need to have [`exiftool`](https://exiftool.org/) installed in your system
and on your `PATH` variable.
