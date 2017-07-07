const kNN = function () { }

kNN.prototype.normalize_groups = (input, data) => {
    let min_max = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        let min = input[i];
        let max = input[i];
        data.forEach((element) => {
            if (min === undefined || element.features[i] < min) {
                min = element.features[i];
            }
            if (max === undefined || element.features[i] > max) {
                max = element.features[i];
            }
        }, this);
        min_max[i] = [min, max];
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].features.length; j++) {
            data[i].features[j] = (data[i].features[j] - min_max[j][0]) / (min_max[j][1] - min_max[j][0]);
        }
    }
    for (let i = 0; i < input.length; i++) {
        input[i] = (input[i] - min_max[i][0]) / (min_max[i][1] - min_max[i][0]);
    }
    return [input, data]
}

/**
 * Calculate the distances between the data and the dataset you want to classify
 * @param input Array with features to classify
 * @param data Array of objects, consisting of a label and an array of features
 * @returns Array of objects with a label and a distance
 */
kNN.prototype.calc_distances = (input, data) => {
    let data_distances = new Array(data.length);
    for (let i = 0; i < data_distances.length; i++) {
        let dist = 0;
        for (let j = 0; j < data[i].features.length; j++) {
            dist += Math.pow((input[j] - data[i].features[j]), 2);
        }
        let dist_sqrt = Math.sqrt(dist);
        data_distances[i] = { label: data[i].label, distance: dist_sqrt };
    }
    return data_distances;
}

/**
 * sorts the distances ascending
 * @param data Array of objects with a label and a distance
 */
kNN.prototype.sort_by_distance = (data) => {
    data.sort(compareDistances = (a, b) => {
        return a.distance - b.distance;
    });
    return data;
}

/**
 * @returns object with labels number of labels
 */
kNN.prototype.count_labels = (data, k) => {
    let result = {};
    for (let i = 0; i < k; i++) {
        result[data[i].label] ? result[data[i].label]++ : result[data[i].label] = 1;
    }
    return result;
}

/**
 * @returns String for the most used label from the counted labels
 */
kNN.prototype.most_used_label = (label_counts) => {
    let highest = { l: '', c: 0 };
    for (let label in label_counts) {
        if (label_counts.hasOwnProperty(label)) {
            if (highest.c < label_counts[label]) {
                highest.c = label_counts[label];
                highest.l = label;
            }
        }
    }
    return highest.l;
}

/**
 * @returns String
 */
kNN.prototype.classify = (input, data, k) => {
    let normalized_values = kNN.prototype.normalize_groups(input, data);
    input = normalized_values[0];
    data = normalized_values[1];
    let distances = kNN.prototype.calc_distances(input, data);
    let distances_sorted = kNN.prototype.sort_by_distance(distances);
    let counted_labels = kNN.prototype.count_labels(distances_sorted, k);
    let result = kNN.prototype.most_used_label(counted_labels);
    return result;
}

module.exports = new kNN();