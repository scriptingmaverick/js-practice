- Generate sequences of consecutive pairs [1,2,3,4,5] =>
  [[1,2],[2,3],[3,4],[4,5]]
- Generate all pair permutations [1,2,3,4,5] =>
  [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],...]
- Generate a cycle of elements [1,2,3,4,5] => [1,2,3,4,5,1,2,3,4,5,...]
- Iterate over lines of text "this\nis\ngood" => ['this','is','good']
- partition by identity: [1,1,1,2,2,1,1,3,3,2] =>
  [[1,1,1],[2,2],[1,1],[3,3],[2]] isEven: [1,3,1,2,2,1,1,3,5,2]
  =>[[1,3,1],[2,2],[1,1,3,5],[2]]
- Prime number series
- Flipped consecutive elements [1,2,3,4] => [2,1,4,3];
- chunk 2: [1,2,3,4] => [[1,2],[3,4]]; 3,1: [1,2,3,4,5] => [[1,2,3],[3,4,5]];
  3,2: [1,2,3,4,5] => [[1,2,3],[2,3,4],[3,4,5]];
- iterate(f,x) => f(x), f(f(x)), f(f(f(x)))
