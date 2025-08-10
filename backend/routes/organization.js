const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function readData() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/organizations.json')));
}
function writeData(data) {
  fs.writeFileSync(path.join(__dirname, '../data/organizations.json'), JSON.stringify(data, null, 2));
}

/**
 * @swagger
 * tags:
 *   - name: Organization
 *     description: Organization management
 */
/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
router.get('/', (req, res) => {
  res.json(readData());
});
/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: Organization created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */
router.post('/', (req, res) => {
  const orgs = readData();
  const org = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  orgs.push(org);
  writeData(orgs);
  res.status(201).json(org);
});
/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Organization found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organization not found
 */
router.get('/:id', (req, res) => {
  const orgs = readData();
  const org = orgs.find(o => o.id === req.params.id);
  if (!org) return res.status(404).json({ error: 'Not found' });
  res.json(org);
});
/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *     summary: Update an organization
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: Organization updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organization not found
 */
router.put('/:id', (req, res) => {
  const orgs = readData();
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orgs[idx] = { ...orgs[idx], ...req.body, updatedOn: new Date() };
  writeData(orgs);
  res.json(orgs[idx]);
});
/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete an organization
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Organization deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organization not found
 */
router.delete('/:id', (req, res) => {
  let orgs = readData();
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = orgs[idx];
  orgs.splice(idx, 1);
  writeData(orgs);
  res.json(deleted);
});

module.exports = router;
