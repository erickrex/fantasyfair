import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

const stepMachine = Machine({
  id: 'step',
  initial: 'one',
  states: {
    one: {
      meta: {
        matchName: "United States Championship",
        contenders:   [
                      {name: "Bobby Lashley", status: "champion"}, 
                      {name: "Riddle", status: "challenger"},
                      {name: "Keith Lee", status: "challenger"}
                  ]
      },
      on: { NEXT: 'two' }
    },
    two: {
      meta: {
        matchName: "24/7 Championship",
        contenders:   [
                      {name: "Asuka", status: "champion"}, 
                      {name: "Orton", status: "challenger"},
                      {name: "Keith Lee", status: "challenger"}
                  ]
      },
      on: { NEXT: 'three', PREV: 'one' }
    },
    three: {
      meta: {
        matchName: "Womens Championship",
        contenders:   [
                      {name: "Bobby Lashley", status: "champion"}, 
                      {name: "Riddle", status: "challenger"},
                      {name: "Keith Lee", status: "challenger"}
                  ]
      },
      on: { NEXT: 'four', PREV: 'two' }
    },
    four: {
      meta: {
        matchName: "North American Championship",
      contenders:   [
                    {name: "Johnny Gargano", status: "champion"}, 
                    {name: "Kushida", status: "challenger"}
                    ]
      },
      on: { NEXT: 'five', PREV: 'three' }
    },
    five: {
      meta: {
        matchName: "United States Championship",
        contenders:   [
                      {name: "Bobby Lashley", status: "champion"}, 
                      {name: "Riddle", status: "challenger"},
                      {name: "Keith Lee", status: "challenger"}
                  ]
      },
      type: 'final'
    }
  }
});

console.log(stepMachine.transition('one', 'NEXT').value);
