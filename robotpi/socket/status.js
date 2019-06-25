import { exec } from "child_process";

export default socket => {
    socket.on('status', () => {
        exec('./get_status.sh', (err, stdout, stderr) => {
            if (err) {
                socket.emit('status', null);
                return;
            }

            socket.emit('status', parseStatus(stdout));
        })
    });
}

const parseStatus = bufferedString => {
    const split = bufferedString.split('\n');

    const statusValues = split.map(row => parseStatusRow(row));
    if (statusValues.length !== 6) {
        return null;
    }

    const throttledBitStatus = statusValues[0];

    return {
        throttled: throttledBitStatus,
        temp: statusValues[1],
        volts: {
            core: statusValues[2],
            sdram_c: statusValues[3],
            sdram_i: statusValues[4],
            sdram_p: statusValues[5]
        }
    };
};

const parseStatusRow = row => {
    if (row) {
        const splitRow = row.split('=');
        if (splitRow.length === 2) {
            return splitRow[1];
        }
    }
    return null;
}