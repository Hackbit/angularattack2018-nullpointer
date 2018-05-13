import {Question} from '../classes/question';

export const QUESTIONS : Question[] = [
    // isuru
    {
      question : 'Go back to previous directory',
      answer : 'cd ..',
      points : 1
    },
    {
      question : 'remove `abc` directory',
      answer : 'rmdir abc',
      points : 1
    },
    {
      question : 'Delete `abc` directory and files in it',
      answer : 'rm -r abc',
      points : 1
    },
    {
      question : 'Check manual of the `cd` command',
      answer : 'man cd',
      points : 1
    },
    {
        question : 'Check your IP address',
        answer : 'hostname -I',
        points : 2
    },
    // shalitha
    {
      question : 'Stage `README.md` on git',
      answer : 'git add README.md',
      points : 1
    },
    {
        question : 'Install Docker on linux using apt',
        answer : 'sudo apt-get install docker',
        points : 2
    },
    {
        question : 'Check whether domain ea.com accessible',
        answer : 'ping ea.com',
        points : 1
    },
    {
        question : 'Run your test.js with node',
        answer : 'node test.js',
        points : 1
    },
    {
        question : 'Create new directory `abc`',
        answer : 'mkdir abc',
        points : 1
    },
    {
        question : 'Serve and open your Angular app',
        answer : 'ng serve --open',
        points : 2
    },
    {
        question : 'List items of current directory in a column',
        answer : 'ls -1',
        points : 1
    },
    {
        question : 'Install dependencies in package.json',
        answer : 'npm install',
        points : 1
    },
    {
        question : 'Rename `a.txt` to `b.txt`',
        answer : 'mv a.txt b.txt',
        points : 1
    },
];
