import { ElectionResultsFromText } from "../STAR";

test("STAR View Sample", () => {
  const csv = `A,B,C,D,E
  0,0,5,3,3
  4,0,3,3,2
  0,0,0,3,1
  2,0,0,3,4
  1,5,0,3,5
  `;
  const { single } = ElectionResultsFromText(csv);
  const expected = [["D", "E"], [], ["C", "A", "B"]];
  expect(Winners(single)).toEqual(expected);
});

test("Mike's Tie for 3rd", () => {
  const csv = `A	B	C	D	E	F
4	2	5	1		5
4	3	2	5	4	0
3	4	5	4	3	2
5	4	3	4	5	2
3	5	4	2	4	1
3	4	2	3	3	4
5	5	4	3	4	2
5	0	4	3	4	5
3	3	4	5	4	1
5	5	4	4	3	3`;
  const expected = [["A"], ["B"], ["D"], ["C"], ["E"], ["F"]];
  const { multi } = ElectionResultsFromText(csv);
  expect(Winners(multi)).toEqual(expected);
});

function Winners(sut, expectedWinners) {
  var winners = sut.sections.map((section) =>
    section.candidates.map((index) => sut.candidates[index].name)
  );
  return winners;
}