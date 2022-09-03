const users = require('../../../models/users');
const fs = require('fs');
const { getError } = require('../../../utils/getError');

const saveConfig = async (req, res) => {
    let response = {
        success: false,
        errorInfo: '',
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            const isNameTaken = !!req.body.name
                ? userDB.files.config.some(
                      (file) => file.name === req.body.name
                  )
                : false;

            if (!isNameTaken) {
                let dir = `./files/${user.username}/`;

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                dir += 'config/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                let doesConfigExist = false;

                const files = await fs.promises.readdir(dir);

                for await (const file of files) {
                    const fileContent = await fs.readFileSync(
                        dir + file,
                        'utf8'
                    );

                    if (fileContent === req.body.config) {
                        doesConfigExist = true;
                        break;
                    }
                }

                if (!req.body.name || req.body.name.length >= 2) {
                    if (!doesConfigExist) {
                        const randomId = Math.random()
                            .toString(36)
                            .substr(2, 9);

                        await fs.writeFileSync(
                            `${dir}/${randomId}.json`,
                            req.body.config,
                            (err) => {
                                if (err) {
                                    response.errorInfo = getError(
                                        'user',
                                        'SAVE_CONFIG_FAILED'
                                    );
                                    return res.status(500).send(response);
                                }
                            }
                        );

                        userDB.files.config.push({
                            file: randomId,
                            name: req.body.name || 'Untitled',
                            created: new Date(),
                        });

                        await userDB.save();

                        response.success = true;
                        response.configId =
                            userDB.files.config[
                                userDB.files.config.length - 1
                            ]._id.toString();
                    } else {
                        response.errorInfo = getError(
                            'user',
                            'CONFIG_ALREADY_EXISTS'
                        );
                    }
                } else {
                    response.errorInfo = getError(
                        'user',
                        'CONFIG_NAME_TOO_SHORT'
                    );
                }
            } else {
                response.errorInfo = getError('user', 'FILE_NAME_TAKEN');
            }
        } else {
            response.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        response.errorInfo = getError('other', 'UNEXPECTED');
        console.log(err);
    }

    return res.status(response.errorInfo?.msg ? 550 : 200).json(response);
};

const getConfig = async (req, res) => {
    let response = {
        success: false,
        errorInfo: '',
        config: {},
        configName: '',
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            const config = userDB.files.config.find(
                (file) => file._id.toString() === req.body.configId
            );

            if (config) {
                response.success = true;

                response.config = JSON.parse(
                    fs.readFileSync(
                        `./files/${user.username}/config/${config.file}.json`
                    )
                );

                response.configName = config.name;
            } else {
                response.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            response.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        response.errorInfo = getError('other', 'UNEXPECTED');
    }

    return res.status(response.errorInfo?.msg ? 550 : 200).json(response);
};

const getConfigs = async (req, res) => {
    let response = {
        success: false,
        errorInfo: '',
        configs: [],
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            response.configs = [...userDB.files.config].map((config) => ({
                ...config._doc,
                fileValue: fs.readFileSync(
                    `./files/${user.username}/config/${config.file}.json`,
                    'utf8'
                ),
            }));
            response.success = true;
        } else {
            response.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        response.errorInfo = getError('other', 'UNEXPECTED');
        response.error = err;
    }

    return res.status(response.errorInfo?.msg ? 550 : 200).json(response);
};

const deleteConfig = async (req, res) => {
    let response = {
        success: false,
        errorInfo: '',
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            const config = userDB.files.config.find(
                (config) => config.file === req.body.file
            );

            if (config) {
                fs.unlinkSync(
                    `./files/${user.username}/config/${config.file}.json`
                );

                userDB.files.config = userDB.files.config.filter(
                    (config) => config.file !== req.body.file
                );

                await userDB.save();

                response.success = true;
            } else {
                response.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            response.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        response.errorInfo = getError('other', 'UNEXPECTED');
        response.error = err;
    }

    return res.status(response.errorInfo?.msg ? 550 : 200).json(response);
};

const updateConfig = async (req, res) => {
    let response = {
        success: false,
        errorInfo: '',
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            const config = userDB.files.config.find(
                (file) => file._id.toString() === req.body.configId
            );

            if (config) {
                if (!req.body.name || req.body.name.length >= 2) {
                    if (!req.body.updateNameOnly)
                        await fs.writeFileSync(
                            `./files/${user.username}/config/${config.file}.json`,
                            req.body.config,
                            (err) => {
                                if (err) {
                                    response.errorInfo = getError(
                                        'user',
                                        'SAVE_CONFIG_FAILED'
                                    );

                                    return res.status(500).send(response);
                                }
                            }
                        );

                    if (req.body.name) {
                        config.name = req.body.name;
                    }

                    config.updated = Date.now();

                    await userDB.save();

                    response.success = true;
                } else {
                    response.errorInfo = getError(
                        'user',
                        'CONFIG_NAME_TOO_SHORT'
                    );
                }
            } else {
                response.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            response.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        response.errorInfo = getError('other', 'UNEXPECTED');
        response.error = err;
    }

    return res.status(response.errorInfo?.msg ? 550 : 200).json(response);
};

module.exports = {
    saveConfig,
    getConfig,
    getConfigs,
    deleteConfig,
    updateConfig,
};
