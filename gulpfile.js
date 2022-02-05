// Main module
import gulp from "gulp";
// Import paths
import { path } from "./gulp/config/path.js";
// Import shared plugins
import { plugins } from "./gulp/config/plugins.js";

// Passing values to global variable
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js"

// File change watcher
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html);

// Building task execution scripts
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Executing the default script
gulp.task('default', dev);