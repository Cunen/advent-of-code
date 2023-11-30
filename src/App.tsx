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
        return "<500ms";
      case Perf.Terrible:
        return ">500ms";
      case Perf.NotComplete:
      default:
        return "";
    }
  };

  const perfToClass = (perf: Perf) => {
    switch (perf) {
      case Perf.Terrible:
        return "terrible";
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
      <div className="title-wrapper">
        <div
          className={
            "tag performance " + getPerfClass(Perf.Impossible, Perf.Impossible)
          }
        >
          {getPerfText(Perf.Impossible, Perf.Impossible)}
        </div>
        <div
          className={"tag performance " + getPerfClass(Perf.Ultra, Perf.Ultra)}
        >
          {getPerfText(Perf.Ultra, Perf.Ultra)}
        </div>
        <div
          className={"tag performance " + getPerfClass(Perf.Fast, Perf.Fast)}
        >
          {getPerfText(Perf.Fast, Perf.Fast)}
        </div>

        <h1>Advent of Code</h1>
        <div
          className={
            "tag performance " + getPerfClass(Perf.Mediocre, Perf.Mediocre)
          }
        >
          {getPerfText(Perf.Mediocre, Perf.Mediocre)}
        </div>
        <div
          className={"tag performance " + getPerfClass(Perf.Slow, Perf.Slow)}
        >
          {getPerfText(Perf.Slow, Perf.Slow)}
        </div>
        <div
          className={
            "tag performance " + getPerfClass(Perf.Terrible, Perf.Terrible)
          }
        >
          {getPerfText(Perf.Terrible, Perf.Terrible)}
        </div>
      </div>
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
