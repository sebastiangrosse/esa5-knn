const kNN = require('./kNN');

let testdata;

beforeAll(() => {
    testdata = [{ label: "Romance", features: [1.234, 1] },
    { label: "Action", features: [2, 2] },
    { label: "Action", features: [4, 4] },
    { label: "Romance", features: [6, 8] }];
})

test('calcuates the distances between the feature groups and the input group', () => {
    let result = kNN.calc_distances([2, 2], testdata);
    expect(result[0].distance).toBeCloseTo(1.259665, 6);
    expect(result[1].distance).toBeCloseTo(0, 2);
    expect(result[2].distance).toBeCloseTo(2.828, 3);
    expect(result[3].distance).toBeCloseTo(7.21, 2);
});

test('sorts the distances', () => {
    let dists = kNN.calc_distances([2, 2], testdata);
    let result = kNN.sort_by_distance(dists);
    expect(result[0].distance).toBeCloseTo(0, 2);
    expect(result[1].distance).toBeCloseTo(1.259665, 6);
    expect(result[2].distance).toBeCloseTo(2.828, 3);
    expect(result[3].distance).toBeCloseTo(7.21, 2);
});

test('counts number of labels', () => {
    let input = [{ label: 'Action', distance: 0 },
    { label: 'Romance', distance: 1.259665034840612 },
    { label: 'Action', distance: 2.8284271247461903 },
    { label: 'Romance', distance: 7.211102550927978 }];
    
    let result = kNN.count_labels(input, 3);
    expect(result['Action']).toBe(2);
    expect(result['Romance']).toBe(1);
});

test('gets the most used label', () => {
    let input = { Action: 2, Romance: 1 };
    let result = kNN.most_used_label(input);
    expect(result).toBe('Action');
});

test('data and input get normalized', () => {
    let result = kNN.normalize_groups([1,2],testdata);
    expect(result[0][1]).toBeCloseTo(0.142857, 6);
    expect(result[1][0].features[0]).toBeCloseTo(0.0468, 4);
})