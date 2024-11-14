'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'john_doe',
          email: 'john@example.com',
          password: await bcrypt.hash('password123', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: 'jane_smith',
          email: 'jane@example.com',
          password: await bcrypt.hash('password123', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: 'bob_wilson',
          email: 'bob@example.com',
          password: await bcrypt.hash('password123', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    const tags = await queryInterface.bulkInsert(
      'tags',
      [
        {
          name: 'Work',
          color: '#FF0000',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Personal',
          color: '#00FF00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Urgent',
          color: '#FFA500',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Study',
          color: '#0000FF',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    const tasks = await queryInterface.bulkInsert(
      'tasks',
      [
        {
          title: 'Complete Project Proposal',
          description: 'Write and submit the Q4 project proposal',
          due_date: new Date(2024, 11, 20),
          status: 'pending',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Weekly Team Meeting',
          description: 'Prepare agenda for weekly team sync',
          due_date: new Date(2024, 11, 15),
          status: 'in progress',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gym Session',
          description: 'Morning workout routine',
          due_date: new Date(2024, 11, 14),
          status: 'pending',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Study JavaScript',
          description: 'Complete online course module',
          due_date: new Date(2024, 11, 25),
          status: 'in progress',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Dentist Appointment',
          description: 'Regular checkup',
          due_date: new Date(2024, 11, 30),
          status: 'pending',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert('task_tags', [
      {
        task_id: 1,
        tag_id: 1, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 1,
        tag_id: 3, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 2,
        tag_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 3,
        tag_id: 2, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 4,
        tag_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 5,
        tag_id: 2, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: 5,
        tag_id: 3, 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('task_tags', null, {});
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};