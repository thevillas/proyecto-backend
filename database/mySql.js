import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'barberia_blessing'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL: ' + err.message);
    } else {
        console.log('Conexión a MySQL');
    }
});

export default connection;