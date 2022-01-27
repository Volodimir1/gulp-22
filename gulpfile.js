// Main module
import gulp from "gulp";
// Import paths
import { path } from "./gulp/config/path.js";

// Passing values to global variable
global.app = {
  path: path,
  gulp: gulp 
}

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";

// File change watcher
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html);

// Building task execution scripts
const dev = gulp.series(reset, mainTasks, watcher);

// Executing the default script
gulp.task('default', dev);