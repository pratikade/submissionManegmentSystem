const express = require('express');
const bodyParser = require('body-parser');
const db = require('./connections/db.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


db.connect(function (err) {
    if (err) throw err;
    console.log("db is connected successfully..");
    // db.query("SELECT * from student_list", (error, result) => {
    //     if(error) throw error;
    //     console.log(result);
    // })    
});

app.get("/", (req, res) => {
    db.query("SELECT * from student_list", (error, result) => {
        if (error) {
            res.status("500").send("something error", error)
        }
        else {
            res.send(result);
        }
    })
})


//post method for getting the data from user backend or frontend.
app.post("/create", (req, res) => {
    const { student_id, student_name } = req.body;

    // Log the request body to verify the received data
    console.log(req.body);

    const sql = "INSERT INTO student_list (student_id, student_name) VALUES (?, ?)";
    db.query(sql, [student_id, student_name], (error, data) => {
        if (error) {
            console.error("Error inserting data: ", error);
            res.status(500).json({ message: "An error occurred while inserting data", error });
        } else {
            res.json(data);
        }
    });
});

//this is an ulternate put method it is also a write but not the most prefferd way.


// app.put("/update/:id", (req, res) => {
//     const { marks, status, remark } = req.body;
//     const student_id = req.params.student_id;  // Extract student_id from req.params

//     const sql = "UPDATE student_list SET marks = ?, status = ?, remark = ? WHERE student_id = ?";
//     db.query(sql, [marks, status, remark, student_id], (error, data) => {
//         if (error) {
//             console.error("Error updating data: ", error);
//             res.status(500).json({ message: "An error occurred while updating data", error });
//         } else {
//             res.json({ message: "Student data updated successfully" });
//         }
//     });
// });

//this is the most preffered way of writing put method and connecting with the database.

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student_list SET marks = ?, status = ?, remark = ? WHERE student_id = ?";
    const values = [
        req.body.marks,
        req.body.status,
        req.body.remark
    ];
    const student_id = req.params.id; // Correctly extract student_id from req.params

    db.query(sql, [...values, student_id], (err, data) => {
        if (err) {
            console.error("Error updating data: ", err);
            return res.status(500).json("PratikError"); // Ensure proper error response
        }
        return res.json(data);
    });
});





// serverside code for the student group
// Create a new group
app.post('/groups', (req, res) => {
    const { group_name } = req.body;
    const sql = "INSERT INTO groups (group_name) VALUES (?)";
    db.query(sql, [group_name], (err, data) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Group created successfully', data });
    });
});



// Add student to a group
app.post('/groups/:group_id/students', (req, res) => {
    const { student_id } = req.body;
    const { group_id } = req.params;


    const sql = "INSERT INTO group_students (student_id, group_id) VALUES (?, ?)";
    db.query(sql, [student_id, group_id], (err, data) => {
        if (err) {
            console.error("Error inserting data: ", err);
            return res.status(500).json({ error: err });
        }
        return res.json({ message: 'Student added to group', data });
    });
});



// Remove student from a group
app.delete('/groups/:group_id/students/:student_id', (req, res) => {
    const { group_id, student_id } = req.params;
    const sql = "DELETE FROM student_groups WHERE student_id = ? AND group_id = ?";
    db.query(sql, [student_id, group_id], (err, data) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Student removed from group', data });
    });
});


// get method for getting group name
app.get('/groupss', (req, res) => {
    db.query("SELECT * from groups", (err, data) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(data);
    });
});


//get method for getting students inside groups
app.get('/groups/:group_id/students', (req, res) => {
    const { group_id } = req.params;
    const sql = `
        SELECT s.student_id, s.student_name
        FROM group_students gs
        JOIN students s ON gs.student_id = s.student_id
        WHERE gs.group_id = ?
    `;
    db.query(sql, [group_id], (err, data) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(data);
    });
});

// get method for getting all studnets in student
app.get('/students', (req, res) => {
    db.query("SELECT * from students", (err, data) => {
        if (err) return res.status(500).json({ error: err });
        return res.json(data);
    });
});

//post method to add more student
app.post("/students", (req, res) => {
    const { student_id } = req.body;
    const { student_name } = req.body;

    const sql = "INSERT INTO students (student_id, student_name) VALUES (?, ?)";
    db.query(sql, [student_id, student_name], (err, data) => {
        if (err) {
            console.error("Error inserting data: ", err);
            return res.status(500).json({ error: err });
        }
        return res.json({ message: 'Student added', data });
    });
})

//delete students from the student list inside a group ...members inside groups
app.delete('/students/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE `student_id` = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("PratikError");
        return res.json(data);
    })
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
