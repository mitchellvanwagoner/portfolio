# Image Optimization Guide

This guide explains how to optimize images for your portfolio using the included Python script.

## Prerequisites

Install Python dependencies:

```bash
pip install Pillow
```

## Basic Usage

Optimize all images in the `data` directory and subdirectories:

```bash
python optimize_images.py
```

Optimize images in a specific directory:

```bash
python optimize_images.py content/projects/keyboard
```

## Options

### Quality Control

Set JPEG/WebP quality (1-100, default: 85):

```bash
python optimize_images.py -q 90
```

### Size Limits

Set maximum dimensions (default: 1920x1920):

```bash
python optimize_images.py --max-width 1600 --max-height 1600
```

### WebP Conversion

Convert images to WebP format:

```bash
python optimize_images.py --webp
```

### Backup Original Files

Create backups before optimization:

```bash
python optimize_images.py --backup
```

### Dry Run

Preview what would happen without modifying files:

```bash
python optimize_images.py --dry-run
```

### Non-Recursive

Only process files in the specified directory (not subdirectories):

```bash
python optimize_images.py --non-recursive
```

## Common Workflows

### When Adding New Images

1. Add your images to the appropriate directory (e.g., `data/new-project/`)
2. Run the optimizer:
   ```bash
   python optimize_images.py data/new-project
   ```
3. Check the output to see size savings
4. Test the images on your site

### Optimize Everything

To re-optimize all images in the portfolio:

```bash
python optimize_images.py --backup
```

This creates backups (.bak files) before optimizing.

### High-Quality Optimization

For maximum quality (larger files):

```bash
python optimize_images.py -q 95
```

### Maximum Compression

For maximum compression (smaller files):

```bash
python optimize_images.py -q 75 --max-width 1600 --max-height 1600
```

## Tips

- **Quality**: 85 is a good balance between file size and quality
- **Dimensions**: Images larger than 1920px are rarely needed for web
- **WebP**: Modern format with better compression, but check browser support
- **Backup**: Use `--backup` when optimizing existing images
- **Test First**: Use `--dry-run` to preview changes

## What Gets Optimized

The script processes:
- **JPEG/JPG**: Compressed with progressive encoding
- **PNG**: Optimized compression
- **WebP**: Already optimized (unless re-sizing)

Images are:
- Compressed to specified quality
- Resized if larger than max dimensions
- Converted to WebP if requested

## Example Output

```
Scanning for images in 'data'...
Found 15 images

[1/15] Processing: data/keyboard/keyboard (1).jpg
  Resized from 4032x3024 to 1920x1440
  3.2 MB → 487.5 KB (saved 2.7 MB, 85.0%)

[2/15] Processing: data/me.jpg
  1.8 MB → 234.1 KB (saved 1.6 MB, 87.0%)

...

===========================================================
OPTIMIZATION SUMMARY
===========================================================
Images processed: 15/15
Total original size: 42.5 MB
Total optimized size: 8.2 MB
Total saved: 34.3 MB (80.7%)
===========================================================
```

## Troubleshooting

**"No module named 'PIL'"**
- Install Pillow: `pip install Pillow`

**"Permission denied"**
- Make sure files aren't open in another program
- On Unix systems, check file permissions

**Images look too compressed**
- Increase quality: `python optimize_images.py -q 90`
- Remove size limits: `python optimize_images.py --max-width 3000`

## Integration with Portfolio

After optimizing images, they'll automatically be used by your portfolio site. No code changes needed - the optimized files replace the originals (unless you use `--backup`).
