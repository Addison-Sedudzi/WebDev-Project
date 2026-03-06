/**
 * Core Conversion Algorithm for GradeSync
 * Accurately maps KNUST CWA to GPA values based on the official scale.
 */

export const convertCWAToGPA = (cwa) => {
    const numCwa = parseFloat(cwa);

    if (isNaN(numCwa) || numCwa < 0 || numCwa > 100) {
        return null; // Invalid input
    }

    // Official KNUST Grading Scale from user update constraints
    if (numCwa >= 70) return { letter: 'A', gpa: 4.0, class: 'First Class' };
    if (numCwa >= 60) return { letter: 'B', gpa: 3.0, class: 'Second Class Upper' };
    if (numCwa >= 50) return { letter: 'C', gpa: 2.0, class: 'Second Class Lower' };
    if (numCwa >= 40) return { letter: 'D', gpa: 1.0, class: 'Pass' };
    return { letter: 'F', gpa: 0.0, class: 'Fail' };
};

export const getAcademicStanding = (gpa) => {
    const numGpa = parseFloat(gpa);
    if (isNaN(numGpa)) return null;

    if (numGpa >= 4.00) return { standing: 'First Class', knust: 'First Class' };
    if (numGpa >= 3.00) return { standing: 'Second Class Upper', knust: 'Second Class Upper' };
    if (numGpa >= 2.00) return { standing: 'Second Class Lower', knust: 'Second Class Lower' };
    if (numGpa >= 1.00) return { standing: 'Pass', knust: 'Pass' };
    return { standing: 'Fail', knust: 'Fail' };
};
