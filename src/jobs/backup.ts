import { spawn } from 'child_process';
import path from 'path';

export class Backup {

  static  backupDatabase(): void {

        const dbName = 'CPAY';
        const archivePath = path.join(__dirname,'../public',`${dbName}.zip`);

        const child = spawn('mongodump', [
            `--db=${dbName}`,
            `--archive==${archivePath}`,
            `--gzip`
        ])

        child.stdout.on('data', (data) => {
            console.log(`stdout`, data);
        })
        child.stderr.on('data', (data) => {
            console.log(`stderr`, data)
        })
        child.on('error', (data) => {
            console.log(`error`, data)
        })
        child.on('exit', (code, signal) => {
            if (code) console.log('process exist with code :', code)
            else if (signal) console.log('proccess killed signal : ', signal)
            else console.log('backup process success full')
        })
    }

    // dbAutoBackUp(removeOldBackup: boolean) {
    //     // check for auto backup is enabled or disabled

    //     let date = new Date();
    //     let beforeDate, oldBackupDir, oldBackupPath;
    //     let currentDate = new Date(); // Current date
    //     var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    //     var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
    //     // check for remove old backup after keeping # of days given in configuration
    //     if (removeOldBackup == true) {
    //         beforeDate = _.clone(currentDate);
    //         beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
    //         oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
    //         oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
    //     }
    //     var cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process

    //     exec(cmd, function (error, stdout, stderr) {
    //         if (this.empty(error)) {
    //             // check for remove old backup after keeping # of days given in configuration
    //             if (dbOptions.removeOldBackup == true) {
    //                 if (fs.existsSync(oldBackupPath)) {
    //                     exec("rm -rf " + oldBackupPath, function (err) { });
    //                 }
    //             }
    //         }
    //     });
    // }

}