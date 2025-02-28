import React, { useState, useEffect } from "react";
import "../index.css"; // TailwindCSS import

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [algorithm, setAlgorithm] = useState("Bubble Sort");
    const [arraySize, setArraySize] = useState(20);

    useEffect(() => {
        resetArray();
    }, [arraySize]);

    const resetArray = () => {
        if (isSorting) return;
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
        setArray(newArray);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Bubble Sort
    const bubbleSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await delay(20);
                }
            }
        }
        setIsSorting(false);
    };

    // Heap Sort
    const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await delay(20);
            await heapify(arr, n, largest);
        }
    };

    const heapSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(arr, n, i);
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            await delay(20);
            await heapify(arr, i, 0);
        }
        setIsSorting(false);
    };

    // Insertion Sort
    const insertionSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            arr[j + 1] = key;
            setArray([...arr]);
        }
        setIsSorting(false);
    };

    // Selection Sort
    const selectionSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }
        setIsSorting(false);
    };

    // Quick Sort
    const quickSortHelper = async (arr, low, high) => {
        if (low < high) {
            let pivotIndex = await partition(arr, low, high);
            await quickSortHelper(arr, low, pivotIndex - 1);
            await quickSortHelper(arr, pivotIndex + 1, high);
        }
    };

    const partition = async (arr, low, high) => {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        return i + 1;
    };

    const quickSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        await quickSortHelper(arr, 0, arr.length - 1);
        setIsSorting(false);
    };

    // Bucket Sort
    const bucketSort = async () => {
        setIsSorting(true);
        let arr = [...array];
        let n = arr.length;
        let maxVal = Math.max(...arr);
        let bucketSize = Math.floor(maxVal / n) + 1;
        let buckets = Array.from({ length: bucketSize }, () => []);

        for (let num of arr) {
            let bucketIndex = Math.floor((num / (maxVal + 1)) * bucketSize);
            buckets[bucketIndex].push(num);
        }

        for (let bucket of buckets) {
            bucket.sort((a, b) => a - b);
        }

        let sortedArray = [].concat(...buckets);
        setArray(sortedArray);
        await delay(20);
        setIsSorting(false);
    };

    const sortingAlgorithms = {
        "Bubble Sort": bubbleSort,
        "Heap Sort": heapSort,
        "Selection Sort": selectionSort,
        "Insertion Sort": insertionSort,
        "Quick Sort": quickSort,
        "Bucket Sort": bucketSort
    };

    const timeComplexities = {
        "Bubble Sort": {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        "Heap Sort": {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        "Quick Sort": { 
            best: "O(n log n)", 
            worst: "O(n²)", 
            average: "O(n log n)" 
        },
        "Insertion Sort": { 
            best: "O(n)", 
            worst: "O(n²)", 
            average: "O(n²)" 
        },
        "Selection Sort": {
            best: "O(n²)", 
            worst: "O(n²)",
            average: "O(n²)"
        },
        "Bucket Sort": {
            best: "O(n + k)",
            average: "O(n + k)",
            worst: "O(n²)"
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Sorting Visualizer</h1>
            <div className="flex items-center gap-4">
                <label className="text-gray-300">Array Size:</label>
                <input
                    type="range"
                    min="5"
                    max="120"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isSorting}
                    className="slider"
                />
                <span>{arraySize}</span>
            </div>
            <div className="flex items-end justify-center w-full max-w-full h-4xl bg-gray-800 p-4 mt-4 rounded-md">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="bg-blue-500 mx-1 rounded"
                        style={{ height: `${value}px`, width: `${600 / array.length}px` }}
                    ></div>
                ))}
            </div>
            <div className="mt-6 space-x-4">
                <button
                    onClick={resetArray}
                    disabled={isSorting}
                    className="px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                >
                    Reset Array
                </button>
                <button
                    onClick={sortingAlgorithms[algorithm]}
                    disabled={isSorting}
                    className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50"
                >
                    Sort
                </button>
            </div>
            <div className="mt-4">
                <label className="text-gray-300">Select Algorithm:</label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="ml-2 p-2 bg-gray-700 text-white rounded"
                    disabled={isSorting}
                >
                    {Object.keys(sortingAlgorithms).map((algo) => (
                        <option key={algo}>{algo}</option>
                    ))}
                </select>
            </div>
            <div className="mt-6 text-gray-300">
                <h2 className="text-xl font-semibold">Time Complexity:</h2>
                <p className="text-green-500">Best Case: {timeComplexities[algorithm].best}</p>
                <p className="text-yellow-500">Average Case: {timeComplexities[algorithm].average}</p>
                <p className="text-red-500">Worst Case: {timeComplexities[algorithm].worst}</p>
            </div>
        </div>
    );
};

export default Sorting;
