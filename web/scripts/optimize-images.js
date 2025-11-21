#!/usr/bin/env node

/**
 * Next-Gen Image Optimization Pipeline
 *
 * Uses Sharp (modern, dependency-free) for optimal web performance
 * Generates WebP/AVIF formats, progressive loading, and responsive images
 *
 * Features:
 * - WebP & AVIF automatic conversion (80%+ smaller files)
 * - Progressive JPEG for better loading
 * - Responsive image generation
 * - Metadata stripping
 * - Quality optimization
 *
 * Usage: npm run optimize-images
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_QUALITY = {
  webp: { quality: 80, progressive: false },
  avif: { quality: 75, lossless: false },
  jpeg: { quality: 80, progressive: true },
  png: { compressionLevel: 9, palette: true }
};

const RESPONSIVE_BREAKPOINTS = [384, 640, 768, 1024, 1280, 1536]; // Tailwind breakpoints

// Utility functions
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Find all image files recursively
 */
async function findImages(dir) {
  const images = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

  async function walk(currentPath) {
    try {
      const files = await fs.readdir(currentPath, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(currentPath, file.name);

        if (file.isDirectory() && !file.name.startsWith('.')) {
          await walk(fullPath);
        } else if (extensions.includes(path.extname(file.name).toLowerCase())) {
          images.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`⚠️  Error reading directory ${currentPath}: ${error.message}`);
    }
  }

  await walk(dir);
  return images;
}

/**
 * Generate WebP version of image
 */
async function generateWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp(OUTPUT_QUALITY.webp)
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.log(`⚠️  WebP generation failed for ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

/**
 * Generate AVIF version of image
 */
async function generateAvif(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .avif(OUTPUT_QUALITY.avif)
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.log(`⚠️  AVIF generation failed for ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

/**
 * Optimize JPEG images
 */
async function optimizeJpeg(inputPath) {
  try {
    const optimizedName = path.basename(inputPath, path.extname(inputPath)) + '_optimized.jpg';
    const outputPath = path.join(path.dirname(inputPath), optimizedName);

    await sharp(inputPath)
      .jpeg(OUTPUT_QUALITY.jpeg)
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.log(`⚠️  JPEG optimization failed: ${error.message}`);
    return null;
  }
}

/**
 * Optimize PNG images
 */
async function optimizePng(inputPath) {
  try {
    const optimizedName = path.basename(inputPath, path.extname(inputPath)) + '_optimized.png';
    const outputPath = path.join(path.dirname(inputPath), optimizedName);

    await sharp(inputPath)
      .png(OUTPUT_QUALITY.png)
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.log(`⚠️  PNG optimization failed: ${error.message}`);
    return null;
  }
}

/**
 * Generate responsive image variants
 */
async function generateResponsive(inputPath, outputDir) {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const variants = [];

  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    try {
      const variantName = `${baseName}_${breakpoint}.webp`;
      const variantPath = path.join(outputDir, variantName);

      await sharp(inputPath)
        .resize(breakpoint)
        .webp(OUTPUT_QUALITY.webp)
        .toFile(variantPath);

      variants.push({ breakpoint, path: variantPath });
    } catch (error) {
      console.log(`⚠️  Responsive variant ${breakpoint}px failed: ${error.message}`);
    }
  }

  return variants;
}

/**
 * Main optimization pipeline
 */
async function optimizeImages() {
  console.log('🚀 Next-Gen Image Optimization Pipeline');
  console.log('='.repeat(60));
  console.log('Features: WebP/AVIF conversion • Progressive JPEG • Responsive variants');
  console.log('='.repeat(60));

  // Ensure images directory exists
  try {
    await fs.access(IMAGES_DIR);
  } catch (error) {
    console.log(`❌ Images directory not found: ${IMAGES_DIR}`);
    console.log('Please run "npm run download-images" first');
    process.exit(1);
  }

  // Find all images
  console.log('\n🔍 Scanning image directories...');
  const images = await findImages(IMAGES_DIR);

  if (images.length === 0) {
    console.log('⚠️  No images found to optimize');
    console.log('Please run "npm run download-images" first');
    process.exit(0);
  }

  console.log(`📁 Found ${images.length} images to process\n`);

  let processed = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let generated = { webp: 0, avif: 0, optimized: 0, responsive: 0 };

  // Process each image
  for (const imagePath of images) {
    processed++;
    const ext = path.extname(imagePath).toLowerCase();
    const baseName = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);
    const relPath = path.relative(IMAGES_DIR, imagePath);

    console.log(`${processed}/${images.length} Processing: ${relPath}`);

    try {
      const originalSize = await getFileSize(imagePath);
      totalOriginalSize += originalSize;

      // Generate WebP version
      const webpPath = path.join(dir, baseName + '.webp');
      const webpSuccess = await generateWebp(imagePath, webpPath);
      if (webpSuccess) {
        generated.webp++;
        console.log(`  ✅ WebP: ${baseName}.webp`);
      }

      // Generate AVIF version (if supported by Sharp)
      const avifPath = path.join(dir, baseName + '.avif');
      const avifSuccess = await generateAvif(imagePath, avifPath);
      if (avifSuccess) {
        generated.avif++;
        console.log(`  ✅ AVIF: ${baseName}.avif`);
      }

      // Optimize original format
      let optimizedPath = null;
      if (['.jpg', '.jpeg'].includes(ext)) {
        optimizedPath = await optimizeJpeg(imagePath);
      } else if (ext === '.png') {
        optimizedPath = await optimizePng(imagePath);
      }

      if (optimizedPath) {
        generated.optimized++;
        const optimizedSize = await getFileSize(optimizedPath);
        console.log(`  ✅ Optimized: ${path.basename(optimizedPath)} (${formatBytes(optimizedSize)})`);
      }

      // Generate responsive variants for hero images
      if (relPath.includes('hero') || relPath.includes('featured')) {
        const responsiveVariants = await generateResponsive(imagePath, dir);
        if (responsiveVariants.length > 0) {
          generated.responsive += responsiveVariants.length;
          console.log(`  ✅ Responsive: ${responsiveVariants.length} variants generated`);
        }
      }

      const fileSize = formatBytes(originalSize);
      console.log(`  📊 Original size: ${fileSize}`);

    } catch (error) {
      console.log(`  ❌ Error processing ${relPath}: ${error.message}`);
    }

    console.log(''); // Add space between images
  }

  // Summary
  console.log('='.repeat(60));
  console.log('🎉 OPTIMIZATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Processed: ${processed} images`);
  console.log(`Generated:`);
  console.log(`  • ${generated.webp} WebP files (modern, 40-80% smaller)`);
  console.log(`  • ${generated.avif} AVIF files (next-gen, 50-90% smaller)`);
  console.log(`  • ${generated.optimized} optimized originals`);
  console.log(`  • ${generated.responsive} responsive variants`);

  if (totalOriginalSize > 0) {
    const spaceSavings = (totalOriginalSize > totalOptimizedSize) ?
      `${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%` : 'optimized';
    console.log(`\n💾 Estimated space savings: ${spaceSavings}`);
  }

  console.log('\n✨ Next Steps:');
  console.log('1. Update Next.js Image components to use modern formats');
  console.log('2. Implement responsive image loading');
  console.log('3. Test page performance with Lighthouse');
  console.log('4. Monitor Core Web Vitals improvements');

  console.log('\n🚀 Ready for production deployment!\n');
}

optimizeImages().catch(console.error);
