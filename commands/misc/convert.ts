module.exports = {
    name: "convert",
    execute(msg) {

        const { cloudConvertToken } = require('../../config.json');

        async function convert() {
            const CloudConvert = require('cloudconvert');
 
            const cloudConvert = new CloudConvert(cloudConvertToken);
            
            let job = await cloudConvert.jobs.create({
                tasks: {
                    'import-my-file': {
                        operation: 'import/url',
                        url: `${msg.attachments.first().url}`,
                        filename: `${msg.attachments.first().name}`
                    },
                    'convert-my-file': {
                        operation: 'convert',
                        input: 'import-my-file',
                        output_format: `${msg.content.substr(8).trim()}`,
                        some_other_option: 'value'
                    },
                    'export-my-file': {
                        operation: 'export/url',
                        input: 'convert-my-file'
                    }
                }
            });
           
            job = await cloudConvert.jobs.wait(job.id); // Wait for job completion
 
            const exportTask = job.tasks.filter(
                task => task.operation === 'export/url' && task.status === 'finished'
            )[0];
            const file = exportTask.result.files[0];

            msg.channel.send(`Download Link: ${file.url}`);

        }

        convert();
        
    },
};