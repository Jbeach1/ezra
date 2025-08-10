const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function readData() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/members.json')));
}
function writeData(data) {
  fs.writeFileSync(path.join(__dirname, '../data/members.json'), JSON.stringify(data, null, 2));
}

/**
 * @swagger
 * tags:
 *   - name: Member
 *     description: Member management
 */
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/', (req, res) => {
  res.json(readData());
});
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Member created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 */
router.post('/', (req, res) => {
  const members = readData();
  const member = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  members.push(member);
  writeData(members);
  res.status(201).json(member);
});
/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
router.get('/:id', (req, res) => {
  const members = readData();
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Not found' });
  res.json(member);
});
/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Member updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
router.put('/:id', (req, res) => {
  const members = readData();
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  members[idx] = { ...members[idx], ...req.body, updatedOn: new Date() };
  writeData(members);
  res.json(members[idx]);
});
/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
router.delete('/:id', (req, res) => {
  let members = readData();
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = members[idx];
  members.splice(idx, 1);
  writeData(members);
  res.json(deleted);
});

module.exports = router;
