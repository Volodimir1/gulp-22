import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
   // Find font's files .otf
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
   .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
         title: "FONTS",
         message: "Error: <%= error.message %>"
      })
   ))
   // Converting to .ttf
   .pipe(fonter({
      formats: ['ttf']
   }))
   // Upload to source folder
   .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
export const ttfToWoff = () => {
   // Find fonts's files .ttf
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })
      ))
      // Convert to .woff
      .pipe(fonter({
         formats: ['woff']
      }))
      // Upload to the folder with the result
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Find fonts's files .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Convert to .woff2
      .pipe(ttf2woff2())
      // Upload to the folder with the result
      .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontsStyle = () => {
   // Style file of fonts connection
   let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
   // Check if fonts files exist
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         // Check if styles file for connecting fonts exist
         if (!fs.existsSync(fontsFile)) {
            // If the file doesn't exist, create it
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
               // Write fonts connections to styles file
               let fontFileName = fontsFiles[i].split('.')[0];
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                  let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                  if (fontWeight.toLowerCase() === 'thin') {
                     fontWeight = 100;
                  } else if (fontWeight.toLowerCase() === 'extralight') {
                     fontWeight = 200;
                  } else if (fontWeight.toLowerCase() === 'light') {
                     fontWeight = 300;
                  } else if (fontWeight.toLowerCase() === 'medium') {
                     fontWeight = 500;
                  } else if (fontWeight.toLowerCase() === 'semibold') {
                     fontWeight = 600;
                  } else if (fontWeight.toLowerCase() === 'bold') {
                     fontWeight = 700;
                  } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                     fontWeight = 800;
                  } else if (fontWeight.toLowerCase() === 'black') {
                     fontWeight = 900;
                  } else {
                     fontWeight = 400;
                  }
                  fs.appendFile(fontsFile,
                     `@font-face {
                        font-family: ${fontName};
                        font-display: swap;
                        src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                        font-weight: ${fontWeight};
                        font-style: normal;
                     }\r\n`, cb);
                  //`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                  newFileOnly = fontFileName;
               }
            }
         } else {
            // If the file exists, display a message
            console.log('File scss/fonts.scss already exists. To update the file, you need to delete it.');
         }
      }
   });

   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() { }
}