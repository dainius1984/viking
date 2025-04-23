const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const QUALITY = 80; // Adjust quality (0-100)
const MAX_WIDTH = {
    logo: 200,      // Max width for logo
    blog: 800,      // Max width for blog images
    payment: 100    // Max width for payment icons
};

// Paths configuration
const IMAGE_PATHS = {
    logo: path.join(__dirname, '../public/img/logo.jpg'),
    blog: path.join(__dirname, '../public/img/blog'),
    payment: path.join(__dirname, '../public/img/logo')
};

// Output paths for optimized images
const OUTPUT_PATHS = {
    logo: path.join(__dirname, '../public/img/optimized/logo.webp'),
    blog: path.join(__dirname, '../public/img/optimized/blog'),
    payment: path.join(__dirname, '../public/img/optimized/logo')
};

// Ensure output directories exist
Object.values(OUTPUT_PATHS).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Optimize logo
async function optimizeLogo() {
    console.log('Optimizing logo...');
    await sharp(IMAGE_PATHS.logo)
        .resize(MAX_WIDTH.logo, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(OUTPUT_PATHS.logo);
    console.log('Logo optimized!');
}

// Optimize blog images
async function optimizeBlogImages() {
    console.log('Optimizing blog images...');
    const blogFiles = fs.readdirSync(IMAGE_PATHS.blog);
    
    for (const file of blogFiles) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(IMAGE_PATHS.blog, file);
            const outputPath = path.join(OUTPUT_PATHS.blog, file.replace(/\.[^.]+$/, '.webp'));
            
            await sharp(inputPath)
                .resize(MAX_WIDTH.blog, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outputPath);
            
            // Create smaller version for thumbnails
            await sharp(inputPath)
                .resize(400, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outputPath.replace('.webp', '-thumb.webp'));
        }
    }
    console.log('Blog images optimized!');
}

// Optimize payment icons
async function optimizePaymentIcons() {
    console.log('Optimizing payment icons...');
    const paymentFiles = fs.readdirSync(IMAGE_PATHS.payment);
    
    for (const file of paymentFiles) {
        if (file.match(/\.(png)$/i)) {
            const inputPath = path.join(IMAGE_PATHS.payment, file);
            const outputPath = path.join(OUTPUT_PATHS.payment, file.replace(/\.[^.]+$/, '.webp'));
            
            await sharp(inputPath)
                .resize(MAX_WIDTH.payment, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outputPath);
        }
    }
    console.log('Payment icons optimized!');
}

// Run all optimizations
async function optimizeAll() {
    try {
        await optimizeLogo();
        await optimizeBlogImages();
        await optimizePaymentIcons();
        console.log('All images have been optimized successfully!');
    } catch (error) {
        console.error('Error during image optimization:', error);
    }
}

optimizeAll(); 