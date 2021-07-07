/*
 * @file Collection of functions for randomness
 *
 * @author Sumit Chaturvedi
 */

function randomSelect (list) { 
  return list[Math.floor(Math.random() * list.length)];
}

export { randomSelect };
