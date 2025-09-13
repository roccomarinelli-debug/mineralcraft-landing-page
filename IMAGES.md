# 🖼️ MINERALCRAFT Images Upload Guide

## 📁 Directory Structure

```
public/images/
├── hero/
│   └── hero-product.webp          # Main product hero image
├── features/                      # ← UPLOAD YOUR IMAGES HERE
│   ├── exceptional-taste.svg      # Replace with final design
│   ├── more-than-bubbles.svg      # Replace with final design
│   ├── luxurious-ritual.svg       # Replace with final design
│   └── sustainable-smart.svg      # Replace with final design
├── products/                      # Future product images
└── icons/                         # UI icons and graphics
```

## 🎯 Feature Images to Replace

### 1. **Exceptional Taste**
- **File**: `public/images/features/exceptional-taste.svg`
- **Current**: 🥤 placeholder with brand colors
- **Theme**: Premium water quality, taste experience
- **Suggested concepts**: Crystal clear water, taste buds, premium bottle

### 2. **More Than Bubbles** 
- **File**: `public/images/features/more-than-bubbles.svg`
- **Current**: 💊 placeholder representing minerals
- **Theme**: Essential minerals, health benefits
- **Suggested concepts**: Mineral crystals, calcium/magnesium symbols, nutrition

### 3. **Luxurious Ritual**
- **File**: `public/images/features/luxurious-ritual.svg`
- **Current**: ✨ placeholder for luxury
- **Theme**: Premium experience, lifestyle elevation
- **Suggested concepts**: Spa elements, premium glassware, elegant bubbles

### 4. **Sustainable & Smart**
- **File**: `public/images/features/sustainable-smart.svg`
- **Current**: 🌱 placeholder for sustainability
- **Theme**: Environmental benefits, smart choice
- **Suggested concepts**: Earth/recycling, no plastic bottles, carbon footprint

## 📐 Technical Specifications

### **File Requirements:**
- **Format**: SVG (preferred) or WebP/PNG
- **Dimensions**: 80x80px
- **File size**: <50KB each
- **Background**: Transparent or brand-matched

### **Brand Colors to Use:**
- **Primary**: #494B33 (Forest Green)
- **Secondary**: #CEB49F (Warm Beige) 
- **Accent**: #C27061 (Terracotta)
- **Cream**: #E0D0D0 (Light Pink)
- **Dark**: #35271C (Dark Brown)

### **Style Guidelines:**
- Clean, modern, minimalist design
- Consistent with premium brand positioning
- Readable at small sizes (80px)
- Works well with current page animations

## 🚀 Upload Process

### **Quick Upload (Recommended):**
1. **Design your 4 feature images** using the specifications above
2. **Save with exact filenames**:
   - `exceptional-taste.svg`
   - `more-than-bubbles.svg` 
   - `luxurious-ritual.svg`
   - `sustainable-smart.svg`
3. **Replace files** in `/public/images/features/` folder
4. **Test locally**: `npm start` → http://localhost:3001
5. **Deploy**: `git add . && git commit -m "Update feature images" && git push`

### **Alternative Formats:**
If you prefer different formats, you can also use:
- `.webp` (best compression)
- `.png` (good quality with transparency)
- `.jpg` (if no transparency needed)

**Just update the file extensions** in `src/App.tsx` lines 536-562 to match your format.

## 🎨 Design Tips

### **Visual Hierarchy:**
- Images should complement, not compete with text
- Use brand colors as primary palette
- Maintain consistent visual weight across all 4 images

### **Animation Considerations:**
- Images have subtle hover effects (1.1x scale, 5° rotation)
- Design should look good in motion
- Avoid overly complex details that blur when scaled

### **Responsive Design:**
- Images display at 80px on desktop
- Scale appropriately on mobile devices
- Maintain clarity at different sizes

## 🔍 Testing Your Images

After uploading:

1. **Desktop test**: Check appearance on large screens
2. **Mobile test**: Verify mobile responsiveness  
3. **Animation test**: Hover over images to see effects
4. **Load speed**: Ensure fast loading (<50KB each)
5. **Brand consistency**: Match overall page aesthetic

## 📞 Support

If you need help with:
- **Image sizing**: Use online tools like TinyPNG or SVGOMG
- **Format conversion**: Use tools like CloudConvert
- **Brand colors**: Refer to brand palette above
- **Technical issues**: Check browser console for errors

---

**Ready to upload?** Replace the 4 placeholder files in `/public/images/features/` and your new images will appear immediately on the live site! 🎉