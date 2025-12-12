import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';

/**
 * Student signup
 * POST /api/auth/student/signup
 */
export const studentSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, studentId } = req.body;

    // Validate
    if (!email || !password || !name || !studentId) {
      res.status(400).json({
        success: false,
        message: 'Email, password, name, and student ID are required',
      });
      return;
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ email: email.toLowerCase() }, { studentId }] });

    if (existingStudent) {
      res.status(400).json({
        success: false,
        message: 'Student with this email or ID already exists',
      });
      return;
    }

    // Create new student
    const newStudent = new Student({
      email: email.toLowerCase(),
      passwordHash: password,
      name,
      studentId,
    });

    await newStudent.save();

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    const token = jwt.sign(
      {
        id: newStudent._id,
        email: newStudent.email,
        studentId: newStudent.studentId,
        role: 'student',
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      token,
      student: {
        id: newStudent._id,
        email: newStudent.email,
        name: newStudent.name,
        studentId: newStudent.studentId,
      },
    });
  } catch (error) {
    console.error('❌ Error during signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Student login
 * POST /api/auth/student/login
 */
export const studentLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    // Find student by email
    const student = await Student.findOne({ email: email.toLowerCase() }).select('+passwordHash');

    if (!student) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Compare password
    const isPasswordValid = await student.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        studentId: student.studentId,
        role: 'student',
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        email: student.email,
        name: student.name,
        studentId: student.studentId,
      },
    });
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
