const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

function readData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', file)));
}
function writeData(file, data) {
  fs.writeFileSync(path.join(__dirname, 'data', file), JSON.stringify(data, null, 2));
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdOn:
 *           type: string
 *         updatedBy:
 *           type: string
 *         updatedOn:
 *           type: string
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         organizationId:
 *           type: string
 *         name:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdOn:
 *           type: string
 *         updatedBy:
 *           type: string
 *         updatedOn:
 *           type: string
 *     Group:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         organizationId:
 *           type: string
 *         locationId:
 *           type: string
 *         name:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdOn:
 *           type: string
 *         updatedBy:
 *           type: string
 *         updatedOn:
 *           type: string
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         organizationId:
 *           type: string
 *         locationId:
 *           type: string
 *         groupId:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdOn:
 *           type: string
 *         updatedBy:
 *           type: string
 *         updatedOn:
 *           type: string
 */

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
router.get('/organizations', (req, res) => {
  res.json(readData('organizations.json'));
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
router.post('/organizations', (req, res) => {
  const orgs = readData('organizations.json');
  const org = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  orgs.push(org);
  writeData('organizations.json', orgs);
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
router.get('/organizations/:id', (req, res) => {
  const orgs = readData('organizations.json');
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
router.put('/organizations/:id', (req, res) => {
  const orgs = readData('organizations.json');
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orgs[idx] = { ...orgs[idx], ...req.body, updatedOn: new Date() };
  writeData('organizations.json', orgs);
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
router.delete('/organizations/:id', (req, res) => {
  let orgs = readData('organizations.json');
  const idx = orgs.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = orgs[idx];
  orgs.splice(idx, 1);
  writeData('organizations.json', orgs);
  res.json(deleted);
});
// ...other CRUD endpoints for organization

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
router.get('/locations', (req, res) => {
  res.json(readData('locations.json'));
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
router.post('/locations', (req, res) => {
  const locs = readData('locations.json');
  const loc = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  locs.push(loc);
  writeData('locations.json', locs);
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
router.get('/locations/:id', (req, res) => {
  const locs = readData('locations.json');
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
router.put('/locations/:id', (req, res) => {
  const locs = readData('locations.json');
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  locs[idx] = { ...locs[idx], ...req.body, updatedOn: new Date() };
  writeData('locations.json', locs);
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
router.delete('/locations/:id', (req, res) => {
  let locs = readData('locations.json');
  const idx = locs.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = locs[idx];
  locs.splice(idx, 1);
  writeData('locations.json', locs);
  res.json(deleted);
});
// ...other CRUD endpoints for location

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
router.get('/groups', (req, res) => {
  res.json(readData('groups.json'));
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
router.post('/groups', (req, res) => {
  const groups = readData('groups.json');
  const group = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  groups.push(group);
  writeData('groups.json', groups);
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
router.get('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
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
router.put('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  groups[idx] = { ...groups[idx], ...req.body, updatedOn: new Date() };
  writeData('groups.json', groups);
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
router.delete('/groups/:id', (req, res) => {
  let groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = groups[idx];
  groups.splice(idx, 1);
  writeData('groups.json', groups);
  res.json(deleted);
});
// ...other CRUD endpoints for group
router.post('/groups', (req, res) => {
  const groups = readData('groups.json');
  const group = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  groups.push(group);
  writeData('groups.json', groups);
  res.status(201).json(group);
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
// Get single group
router.get('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Not found' });
  res.json(group);

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
});
// Update group
router.put('/groups/:id', (req, res) => {
  const groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  groups[idx] = { ...groups[idx], ...req.body, updatedOn: new Date() };
  writeData('groups.json', groups);

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
  res.json(groups[idx]);
});
// Delete group
router.delete('/groups/:id', (req, res) => {
  let groups = readData('groups.json');
  const idx = groups.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = groups[idx];
  groups.splice(idx, 1);

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdOn:
 *           type: string
 *         updatedBy:
 *           type: string
 *         updatedOn:
 *           type: string
 */
  writeData('groups.json', groups);
  res.json(deleted);
});
// ...other CRUD endpoints for group

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
router.get('/members', (req, res) => {
  res.json(readData('members.json'));
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
router.post('/members', (req, res) => {
  const members = readData('members.json');
  const member = { ...req.body, id: uuidv4(), createdOn: new Date(), updatedOn: new Date() };
  members.push(member);
  writeData('members.json', members);
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
router.get('/members/:id', (req, res) => {
  const members = readData('members.json');
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
router.put('/members/:id', (req, res) => {
  const members = readData('members.json');
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  members[idx] = { ...members[idx], ...req.body, updatedOn: new Date() };
  writeData('members.json', members);
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
router.delete('/members/:id', (req, res) => {
  let members = readData('members.json');
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = members[idx];
  members.splice(idx, 1);
  writeData('members.json', members);
  res.json(deleted);
});
// ...other CRUD endpoints for member

module.exports = router;
