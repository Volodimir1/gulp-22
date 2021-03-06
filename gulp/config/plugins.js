import replace from "gulp-replace"; // Search and replace
import plumber from "gulp-plumber"; // Error processing
import notify from "gulp-notify"; // Messages (tips)
import browsersync from "browser-sync"; // Local server
import newer from "gulp-newer"; // Update's check
import ifPlugin from "gulp-if"; // Conditional branching

// Export object
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin
}