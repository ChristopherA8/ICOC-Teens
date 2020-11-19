module.exports = {
    name: "convert",
    execute(msg) {

        async function convert() {
            const CloudConvert = require('cloudconvert');
 
            const cloudConvert = new CloudConvert('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzM3OWQ1MmYwZTM5N2Q4ZTA4ZjYyZjE1OWQwZDllYTAzOTBkZGY4YjdiNDViY2U0MzExZmNlMTllMjZlN2MxNjk4NTY2ZDM3MjQ4YTg3OWQiLCJpYXQiOjE2MDU3MTc0NTUsIm5iZiI6MTYwNTcxNzQ1NSwiZXhwIjo0NzYxMzkxMDU1LCJzdWIiOiI0Njg5MzM3MyIsInNjb3BlcyI6WyJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.T7mkJoOcBAxqSjWvVrwWK_iAM2vMlLtMOONQRGKgotLSFoEy2BytVf9liyIb7NBskebs109LhSvSZrr3tryHll5bWs-IOaWFYRR8eD4UtgKycz8bJbVa1GAd8agBFhfQY4A6KyjNjqGJQKk1C_CBmx40bD-ek9uR1CfVrnbW7keFnjfeKqI1IjjUSn_EOkGnmmR9TqqHAsPDz_2fDIdnGKh2ASuHo3H44BKrTdJC7HRagoBDOILmny6bQFrXfBOFPwYYavZNWrtwgR8FKHwsFfihiEmHh00-nIwCKS5B34VkLurGh2o48YZ8frMBs2maKfou0C7jbYeogJuJWgSEgaksAuPq1DaiEOtQp2iBabmdej4OaDLDQPu-skzA5l3qT37OCpHz-io7AmM2nrP8Glh_qpIarT8MehOCpJA6BV0IF5TwlKdaWURih1oDxSl-zkcdOMuPGlzH0562RFSBJNV3YobPbRJk4dU0J4HNb4pjO255vypxQAKIU41SADMjJUzvY4G5Vf-LzRkUqYwEiwWsqil7Wa_2bB3VVlnMYwhyYaIwaFF75WUEMS9vzb4DdU93SWiiixA4a4IyekjofciLJnllQpLNg4ATv7gv9gSUYjxKkV4lGKpBrtp7bmhOphXbsZdt2tXAGjjHB1ZZ5XpNz1_XlFJtpobLd0nbmVg');
            
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