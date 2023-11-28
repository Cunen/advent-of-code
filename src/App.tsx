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
      case Perf.Impossible:
        return "<1ms";
      case Perf.Ultra:
        return "<5ms";
      case Perf.Fast:
        return "<50ms";
      case Perf.Mediocre:
        return "<200ms";
      case Perf.Slow:
        return ">500ms";
      case Perf.NotComplete:
      default:
        return "";
    }
  };

  const perfToClass = (perf: Perf) => {
    switch (perf) {
      case Perf.Impossible:
        return "impossible";
      case Perf.Ultra:
        return "ultra";
      case Perf.Fast:
        return "fast";
      case Perf.Mediocre:
        return "mediocre";
      case Perf.Slow:
        return "slow";
      case Perf.NotComplete:
      default:
        return "";
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

  const runFn = (fn: () => void, year: number, day: number) => {
    console.log(`-- Running ${year} - Day ${day} --`);
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log("Performance:", (end - start).toFixed(1), "ms");
    console.log("--------------------------");
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
                  <button
                    className="button"
                    onClick={() => runFn(fn, year, day)}
                  >
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
