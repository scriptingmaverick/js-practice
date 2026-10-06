import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@FunctionalInterface
interface SpaceCraftCalculate {
  long calculate(int mass);
}

class SpaceCraft {
  public int calcualteFuelRequired(int mass) {
    return Math.round(mass / 3) - 2;
  }

  public long recursiveAdd(int[] masses, SpaceCraftCalculate scc) {
    long sum = 0l;
    for (int mass : masses) {
      sum += scc.calculate(mass);
    }

    return sum;
  }

  public long recursiveAddWithFuel(int mass) {
    if (mass < 3)
      return 0l;

    int fuelRequired = calcualteFuelRequired(mass);

    if(fuelRequired < 0)
      return 0l;

    return fuelRequired + recursiveAddWithFuel(fuelRequired);
  }
}

class Checker {
  public void minimalTest(SpaceCraft sc) {

    System.out.println("For m = 12 : " + sc.calcualteFuelRequired(12));

    System.out.println("For m = 14 : " + sc.calcualteFuelRequired(14));

    System.out.println("For m = 1969 : " + sc.calcualteFuelRequired(1969));

    System.out.println("For m = 100756 : " + sc.calcualteFuelRequired(100756));
  }
  
  public void testWithArray(SpaceCraft sc) {
    int[] masses = { 12, 14, 1969, 100756 };

    System.out.println("Checking with array of [ 12, 14, 1969, 100756 ] : " + sc.recursiveAdd(masses, (int mass) -> sc.calcualteFuelRequired(mass)));
  }

  public void testWithArray2(SpaceCraft sc) {
    int[] masses = { 12, 14, 1969, 100756 };

    System.out.println("Checking with array of [ 12, 14, 1969, 100756 ] : " + sc.recursiveAdd(masses, (int mass) -> sc.recursiveAddWithFuel(mass)));
  }

  public void testWithInputFile(SpaceCraft sc) throws IOException {
    int[] masses = Files.readAllLines(Path.of("input.txt")).stream()
        .mapToInt(line -> Integer.parseInt(line.trim()))
        .toArray();

    System.out.println("Checking with values from input.txt : " + sc.recursiveAdd(masses, (int mass) -> sc.calcualteFuelRequired(mass)));
  }

  public void minimalTest2(SpaceCraft sc) {
    System.out.println("For m = 12 : " + sc.recursiveAddWithFuel(12));

    System.out.println("For m = 14 : " + sc.recursiveAddWithFuel(14));

    System.out.println("For m = 1969 : " + sc.recursiveAddWithFuel(1969));

    System.out.println("For m = 100756 : " + sc.recursiveAddWithFuel(100756));
  }
}

public class Day1 {
  public static void main(String[] a) throws IOException {
    Checker ch = new Checker();
    SpaceCraft sc = new SpaceCraft();

    // ch.minimalTest(sc);
    ch.testWithArray(sc);
    // ch.testWithInputFile(sc);

    // ch.minimalTest2(sc);
    ch.testWithArray2(sc);
  }
}