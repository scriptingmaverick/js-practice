class SpaceCraft {
  public int calcualteFuelRequired(int mass) {
    return Math.round(mass / 3) - 2;
  }
}

class Checker {
  public void minimalTest(SpaceCraft sc) {
    
    System.out.println("For m = 12 : " + sc.calcualteFuelRequired(12));

    System.out.println("For m = 14 : " + sc.calcualteFuelRequired(14));
    
    System.out.println("For m = 1969 : " + sc.calcualteFuelRequired(1969));

    System.out.println("For m = 100756 : " + sc.calcualteFuelRequired(100756));
  }
}

public class Day1 {
  public static void main(String[] a) {
    Checker ch = new Checker();
    SpaceCraft sc = new SpaceCraft();

    ch.minimalTest(sc);
    
  }
}