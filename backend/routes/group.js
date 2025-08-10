const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function readData() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/groups.json')));
}
function writeData(data) {
  fs.writeFileSync(path.join(__dirname, '../data/groups.json'), JSON.stringify(data, null, 2));
}

/**
 * @swagger
 * tags:
 *   - name: Group
 *     description: Group management
 */
/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', (req, res) => {
  res.json(readData());
});
/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */
router.post('/', (req, res) => {
  const groups = readData();
  const group = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  groups.push(group);
  writeData(groups);
  res.status(201).json(group);
});
/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.get('/:id', (req, res) => {
  const groups = readData();
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Not found' });
  res.json(group);
});
/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Update a group
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.put('/:id', (req, res) => {
  const groups = readData();
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  groups[idx] = { ...groups[idx], ...req.body, updatedOn: new Date() };
  writeData(groups);
  res.json(groups[idx]);
});
/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.delete('/:id', (req, res) => {
  let groups = readData();
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = groups[idx];
  groups.splice(idx, 1);
  writeData(groups);
  res.json(deleted);
});

module.exports = router;
