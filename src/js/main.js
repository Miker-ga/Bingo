const tombola = [];

function generate(max = 100) {
  let numbers = [];
  for (const i = 0; i <= max; i++) {
    numbers[i] = i;
  }
}

function shuffle(numbers) {
  return numbers.sort(() => Math.random() - 0.5);
}

function main() {
  tombola = shuffle(generate());
}

main();
