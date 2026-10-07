import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

class IntCodeProgram {
  public int[] run(int[] programCode) {
    int i = 0;
    int[] program = programCode.clone();
    while (i < program.length) {
      int opcode = program[i];

      switch (opcode) {
        case 1:
        {
          int pos1 = program[i + 1];
          int pos2 = program[i + 2];
          int pos3 = program[i + 3];
          program[pos3] = program[pos1] + program[pos2];
          i += 4;
          break;
        }
        case 2:
        {
          int pos1 = program[i + 1];
          int pos2 = program[i + 2];
          int pos3 = program[i + 3];
          program[pos3] = program[pos1] * program[pos2];
          i += 4;
          break;
        }
        case 99:
          i = program.length;
          break;
        default:
          throw new RuntimeException("Some error happened i: " + i);
      }
    }
    return program; 
  }  
}

class Checker {

  public void minimalTest(IntCodeProgram program) {
    int[] input = { 1, 0, 0, 0, 99 };
    // int[] expectedOutput = { 2, 0, 0, 0, 99 };
    int[] output = program.run(input.clone());
    System.out
        .println("Test input: " + java.util.Arrays.toString(input) + ", Output: " + java.util.Arrays.toString(output));

    int[] input2 = { 2, 3, 0, 3, 99 };
    // int[] expectedOutput2 = {2, 3, 0, 6, 99};
    int[] output2 = program.run(input2.clone());
    System.out.println(
        "Test input: " + java.util.Arrays.toString(input2) + ", Output: " + java.util.Arrays.toString(output2));

    int[] input3 = { 2, 4, 4, 5, 99, 0 };
    // int[] expectedOutput3 = { 2, 4, 4, 5, 99, 9801 };
    int[] output3 = program.run(input3.clone());
    System.out.println(
        "Test input: " + java.util.Arrays.toString(input3) + ", Output: " + java.util.Arrays.toString(output3));

    int[] input4 = { 1, 1, 1, 4, 99, 5, 6, 0, 99 };
    // int[] expectedOutput4 = { 30, 1, 1, 4, 2, 5, 6, 0, 99 };
    int[] output4 = program.run(input4.clone());
    System.out.println(
        "Test input: " + java.util.Arrays.toString(input4) + ", Output: " + java.util.Arrays.toString(output4));
  }

  public void testWithInput(IntCodeProgram program) throws IOException {
    int[] programCode = Files.readAllLines(Path.of("input.txt")).stream()
        .flatMap(line -> java.util.Arrays.stream(line.split(","))).mapToInt(Integer::parseInt)
        .toArray();

    programCode[1] = 12;
    programCode[2] = 2;

    int[] output = program.run(programCode.clone());

    System.out.println(
        "Test input: " + java.util.Arrays.toString(programCode) + "\n\nOutput: " + java.util.Arrays.toString(output));
  }

  public void testWithDeterminedInput(IntCodeProgram program) throws IOException {
    int[] programCode = Files.readAllLines(Path.of("input.txt")).stream()
        .flatMap(line -> java.util.Arrays.stream(line.split(","))).mapToInt(Integer::parseInt)
        .toArray();

    for (int noun = 0; noun <= 99; noun++) {
      int[] input = programCode.clone();
      input[1] = noun;
      
      for (int verb = 0; verb <= 99; verb++) {
        System.out.println("noun: " + noun + ", verb: " + verb);
        input[2] = verb;

        int[] output = program.run(input);

        if (output[0] == 19690720) {
          System.out.println("sol: " + (noun * 100 + verb));
          return;
        }
      }
    }
  }
}

public class Day2 {
  public static void main(String[] args) throws IOException {
    IntCodeProgram program = new IntCodeProgram();
    Checker checker = new Checker();

    checker.testWithDeterminedInput(program);
  }
}
