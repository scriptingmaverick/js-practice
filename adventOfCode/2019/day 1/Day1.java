class SpaceCraft {
  public int calcualteFuelRequired(int mass) {
    return Math.round(mass / 3) - 2;
  }

  public long recursiveAdd(int[] masses) {
    long sum = 0l;
    for (int mass : masses) {
      sum += calcualteFuelRequired(mass);
    }

    return sum;
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

    System.out.println("Checking with array of [ 12, 14, 1969, 100756 ] : " + sc.recursiveAdd(masses));
  }
}

public class Day1 {
  public static void main(String[] a) {
    Checker ch = new Checker();
    SpaceCraft sc = new SpaceCraft();

    // ch.minimalTest(sc);
    
    ch.testWithArray(sc);
  }
}