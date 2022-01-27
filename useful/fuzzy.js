const items = require('../arrays/items');

module.exports = async (client) => {
  client.getItem = search;
}


function similarityBetween(s1, s2) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (
            (longerLength - editDistance(longer, shorter)) /
            parseFloat(longerLength)
        );
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue =
                                Math.min(
                                    Math.min(newValue, lastValue),
                                    costs[j]
                                ) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    }


function search(query) {
        query = query.toLowerCase().trim();

        const target = items;
        const candidates = [];

        for (const item in target) {
            const candidate = {
                item: target[item],
                similarity: 0,
            };

            if (candidate.item.id.toLowerCase() === query) {
                candidate.similarity = 1;
            } else if (candidate.item.name.toLowerCase() === query) {
                candidate.similarity = 0.999;
            } else if (
                candidate.item.name
                    .toLowerCase()
                    .includes(" " + query + " ") ||
                candidate.item.id.includes(" " + query + " ")
            ) {
                candidate.similarity = 0.998;
            } else if (
                candidate.item.name.toLowerCase().includes(query + " ") ||
                candidate.item.id.includes(query + " ")
            ) {
                candidate.similarity = 0.997;
            } else if (
                candidate.item.name.toLowerCase().includes(" " + query) ||
                candidate.item.id.includes(" " + query)
            ) {
                candidate.similarity = 0.997;
            } else if (
                candidate.item.name.toLowerCase().includes(query) ||
                candidate.item.id.includes(query)
            ) {
                candidate.similarity = 0.996;
            } else {
                const similarity = similarityBetween(
                    query,
                    candidate.item.name
                );
                candidate.similarity = similarity;
            }

            candidates.push(candidate);
        }
        return candidates.length
            ? candidates.sort((a, b) => b.similarity - a.similarity)
            : false;
    }
