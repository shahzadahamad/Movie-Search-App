export default function getRandomRating() {
  // Generate a random number between 5 and 9.6
  return (Math.random() * 4.6 + 5).toFixed(1);
}
