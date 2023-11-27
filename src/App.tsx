import React, { Fragment } from "react";
import "./App.css";
import { Perf, challenges } from "./aoc/challenges";

function App() {
  const renderStar = (a: Perf, b: Perf) => {
    if (b !== Perf.NotComplete) return <div className="gold" />;
    else if (a !== Perf.NotComplete) return <div className="silver" />;
    return null;
  };

  const perfToText = (perf: Perf) => {
    switch (perf) {
      case Perf.NotComplete:
        return "";
      case Perf.Fast:
        return "<50ms";
      case Perf.Mediocre:
        return "<200ms";
      case Perf.Slow:
        return ">500ms";
    }
  };

  const perfToClass = (perf: Perf) => {
    switch (perf) {
      case Perf.NotComplete:
        return "";
      case Perf.Fast:
        return "fast";
      case Perf.Mediocre:
        return "mediocre";
      case Perf.Slow:
        return "slow";
    }
  };

  const getPerfText = (a: Perf, b: Perf) => {
    if (a === Perf.NotComplete && b === Perf.NotComplete) return "";
    if (b !== Perf.NotComplete) return perfToText(b);
    else return perfToText(a);
  };

  const getPerfClass = (a: Perf, b: Perf) => {
    if (a === Perf.NotComplete && b === Perf.NotComplete) return "";
    if (b !== Perf.NotComplete) return perfToClass(b);
    else return perfToClass(a);
  };

  const runFn = (fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log("Performance:", end - start, "ms");
  };

  return (
    <>
      <h1>Advent of Code</h1>
      <div className="App">
        {challenges.map(({ year, day, part1, part2, fn }) => {
          return (
            <div className="challenge" key={year + "-" + day}>
              <div className="data-wrapper">
                <div className="title">
                  {year} - Day {day}
                </div>
                <div className="status-wrapper">
                  <div className="star">
                    {renderStar(
                      part1 ?? Perf.NotComplete,
                      part2 ?? Perf.NotComplete
                    )}
                  </div>
                  <div
                    className={
                      "performance " +
                      getPerfClass(
                        part1 ?? Perf.NotComplete,
                        part2 ?? Perf.NotComplete
                      )
                    }
                  >
                    {getPerfText(
                      part1 ?? Perf.NotComplete,
                      part2 ?? Perf.NotComplete
                    )}
                  </div>
                </div>
              </div>
              <div className="button-wrapper">
                {fn && (
                  <button className="button" onClick={() => runFn(fn)}>
                    Run
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
