const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function readData() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/locations.json')));
}
function writeData(data) {
  fs.writeFileSync(path.join(__dirname, '../data/locations.json'), JSON.stringify(data, null, 2));
}

/**
 * @swagger
 * tags:
 *   - name: Location
 *     description: Location management
 */
/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/', (req, res) => {
  res.json(readData());
});
/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.post('/', (req, res) => {
  const locs = readData();
  const loc = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  locs.push(loc);
  writeData(locs);
  res.status(201).json(loc);
});
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get('/:id', (req, res) => {
  const locs = readData();
  const loc = locs.find(l => l.id === req.params.id);
  if (!loc) return res.status(404).json({ error: 'Not found' });
  res.json(loc);
});
/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Update a location
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.put('/:id', (req, res) => {
  const locs = readData();
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  locs[idx] = { ...locs[idx], ...req.body, updatedOn: new Date() };
  writeData(locs);
  res.json(locs[idx]);
});
/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.delete('/:id', (req, res) => {
  let locs = readData();
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = locs[idx];
  locs.splice(idx, 1);
  writeData(locs);
  res.json(deleted);
});

module.exports = router;
