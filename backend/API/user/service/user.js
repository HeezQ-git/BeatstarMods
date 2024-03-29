const users = require('../../../models/users');
const fs = require('fs');
const { getError } = require('../../../utils/getError');

const saveConfig = async (req, res) => {
    let result = {
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
                                    result.errorInfo = getError(
                                        'user',
                                        'SAVE_CONFIG_FAILED'
                                    );
                                    return res.status(500).send(result);
                                }
                            }
                        );

                        userDB.files.config.push({
                            file: randomId,
                            name: req.body.name || 'Untitled',
                            created: new Date(),
                        });

                        await userDB.save();

                        result.success = true;
                        result.configId =
                            userDB.files.config[
                                userDB.files.config.length - 1
                            ]._id.toString();
                    } else {
                        result.errorInfo = getError(
                            'user',
                            'CONFIG_ALREADY_EXISTS'
                        );
                    }
                } else {
                    result.errorInfo = getError(
                        'user',
                        'CONFIG_NAME_TOO_SHORT'
                    );
                }
            } else {
                result.errorInfo = getError('user', 'FILE_NAME_TAKEN');
            }
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        console.log(err);
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

const getConfig = async (req, res) => {
    let result = {
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
                result.success = true;

                result.config = JSON.parse(
                    fs.readFileSync(
                        `./files/${user.username}/config/${config.file}.json`
                    )
                );

                result.configName = config.name;
            } else {
                result.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

const getConfigs = async (req, res) => {
    let result = {
        success: false,
        errorInfo: '',
        configs: [],
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            result.configs = [...userDB.files.config].map((config) => ({
                ...config._doc,
                fileValue: fs.readFileSync(
                    `./files/${user.username}/config/${config.file}.json`,
                    'utf8'
                ),
            }));
            result.success = true;
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        result.error = err;
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

const deleteConfig = async (req, res) => {
    let result = {
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

                result.success = true;
            } else {
                result.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        result.error = err;
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

const updateConfig = async (req, res) => {
    let result = {
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
                                    result.errorInfo = getError(
                                        'user',
                                        'SAVE_CONFIG_FAILED'
                                    );

                                    return res.status(500).send(result);
                                }
                            }
                        );

                    if (req.body.name) {
                        config.name = req.body.name;
                    }

                    config.updated = Date.now();

                    await userDB.save();

                    result.success = true;
                } else {
                    result.errorInfo = getError(
                        'user',
                        'CONFIG_NAME_TOO_SHORT'
                    );
                }
            } else {
                result.errorInfo = getError('user', 'FILE_NOT_EXIST');
            }
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        result.error = err;
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

const getUser = async (req, res) => {
    let result = {
        success: false,
        errorInfo: '',
        user: null,
    };

    try {
        const { user } = req.user;
        const userDB = await users.findOne({ username: user.username });

        if (userDB) {
            result.success = true;
            result.user = {
                username: userDB.username,
                email: userDB.email,
                isVerified: userDB.isVerified,
            };
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }
    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        result.error = err;
    }

    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

module.exports = {
    saveConfig,
    getConfig,
    getConfigs,
    deleteConfig,
    updateConfig,
    getUser,
};
