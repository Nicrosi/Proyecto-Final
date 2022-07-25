import React from "react";
import Reacket from "reacket";

const brackets = [
  {
    id: 1,
    round: 1,
    match: 1,
    players: [
      {
        id: 1,
        name: "Mr. Orange",
        seed: 1,
      },
      {
        id: 2,
        name: "Mr. White",
        seed: 8,
      },
    ],
    score: [0, 1],
  },
  {
    id: 2,
    round: 1,
    match: 2,
    players: [
      {
        id: 3,
        name: "Mr. Pink",
        seed: 5,
      },
      {
        id: 4,
        name: "Mr. Blue",
        seed: 4,
      },
    ],
    score: [0, 1],
  },
  {
    id: 3,
    round: 1,
    match: 3,
    players: [
      {
        id: 5,
        name: "Mr. Brown",
        seed: 3,
      },
      {
        id: 6,
        name: "Mr. Black",
        seed: 6,
      },
    ],
    score: [0, 1],
  },
  {
    id: 4,
    round: 1,
    match: 4,
    players: [
      {
        id: 7,
        name: "Mr. Red",
        seed: 7,
      },
      {
        id: 8,
        name: "Mr. Yellow",
        seed: 2,
      },
    ],
    score: [1, 0],
  },
  {
    id: 5,
    round: 2,
    match: 1,
    players: [
      {
        id: 2,
        name: "Mr. White",
        seed: 7,
      },
      {
        id: 4,
        name: "Mr. Blue",
        seed: 4,
      },
    ],
    score: [0, 1],
  },
  {
    id: 6,
    round: 2,
    match: 2,
    players: [
      {
        id: 6,
        name: "Mr. Black",
        seed: 6,
      },
      {
        id: 7,
        name: "Mr. Red",
        seed: 7,
      },
    ],
    score: [0, 1],
  },
  {
    id: 7,
    round: 3,
    match: 1,
    players: [
      {
        id: 4,
        name: "Mr. Blue",
        seed: 4,
      },
      {
        id: 7,
        name: "Mr. Red",
        seed: 7,
      },
    ],
    score: [0, 1],
  },
];

const Brackets = () => <Reacket matches={brackets} />;

export default Brackets;
