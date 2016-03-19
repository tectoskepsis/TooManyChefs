/**
 * Helper functions to extend prototypes
 */

/* Repeat a string n times */
String.prototype.repeat = String.prototype.repeat || function(n) {
  return Array(n+1).join(this);
}

