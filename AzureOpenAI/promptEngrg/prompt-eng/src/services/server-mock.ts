import { ServerDetails } from "src/misc/model/server.model"

export const server_details: ServerDetails[]  = 
[
    {
        Id: 1,
        Name: "VD801519",
        Airid: 2613,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "Database",
        Health: "Critical",
        Insights: `
            Here are some insights based on the provided information:

            <ul>
            <li> The average CPU idle percentage on the server with host VD801519 is 96.29401398% .</li>
            <li> The average amount of free memory on the server with host VD801519 is 31GB .</li>
            <li> The average CPU I/O wait time on the server with host VD801519 is 0 .</li>
            <li> There are no blocked connections in the SQL Server activity on the server with host VD801519.</li>
            <li> The buffer cache hit ratio in the SQL Server on the server with host VD801519 is 1.</li>
            </ul>
            Please note that these insights are based on the provided data and may not represent the complete analysis of the server. Let me know if you need further assistance.
        `,
        Recommendations: `
            Here are some recommendations based on the provided information:
            
            <li>For high CPU utilization:
              <ul>
                <li>Check CPU and Memory on the Operating System Level using the Windows Task Manager. If the CPU usage is fluctuating, close the ticket. If the CPU utilization is consistently 100%, check the processes running and reassign the ticket if the high CPU usage is not caused by SQL Server. If SQL Server is causing the high CPU, check the CPU of SQL Server using SSMS and inform the application team about the statements on Runnable status. If requested, provide the specific queries under Runnable status and CPU expensive queries.</li>
              </ul>
            </li>
            <li>For high memory utilization:
              <ul>
                <li>Check Memory on the Operating System Level using the Task Manager. If the memory usage is fluctuating, close the ticket. If the memory is consistently 91-100%, check the processes running and reassign the ticket if the low memory is caused by processes other than SQL Server. If SQL Server is causing the low memory, execute the attached script to check the memory of SQL Server. Check the memory usage of SQL Server and cross-check with the memory pinned to SQL. Ensure that the Page Life Expectancy has a minimum running value of 300. If other processes are causing the low memory, seek help from ED for further checking on the OS leve.</li>
              </ul>
            </li>
            <li>For backup/restore failures:
              <ul>
                <li>Check the log of the failed backup. If the backup job fails due to a disk space issue, check if there are old backups that can be deleted or find a drive with enough disk space for temporary backup placement. If the backup fails due to the "Cannot open database" reason, check if the requested database exists in the instance. If it doesn't exist, inform the application team. If the restore fails, check the log of the failed restore. If it's due to disk space, inform the application team about the need for additional disk space. If it's due to "Database files of database backup and destination database do not match," check the structure of the database in the production environment and inform the application team to create a change request for the re-creation of the database in the staging environment.</li>
              </ul>
            </li>
        `,
        idle: `96.29401398`,
        free: `31GB`,
        iowait: `0`,
        blocked_connections: `0`,
        cache_hit_ratio: `1`
    },
    {
        Id: 2,
        Name: "VD801508",
        Airid: 2613,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "Application",
        Health: "Unhealthy",
        Insights: `
            Based on the provided data for server VD801508, here are some insights:

            <ul>
            <li>The average CPU idle is 35.29%, which indicates that the server is healthy.</li>
            <li>The average free memory is 10GB, which is less than 20% of the total RAM. This indicates that the server is unhealthy.</li>
            <li>The average CPU I/O wait is 2 seconds, which is below the threshold of 10 seconds. This indicates that the server is healthy.</li>
            <li>The average number of blocked connections is 5, which is greater than 1. This indicates that the server is unhealthy.</li>
            <li>The average buffer cache hit ratio is 1, which is above the threshold of 0.89. This indicates that the server is healthy.</li>
            </ul>

            Please note that the server's health status is a combination of these metrics, and it is determined by the overall assessment of the metrics.
        `,
        Recommendations: `
            Based on the provided documents, here are some recommendations for the unhealthy or critical states:

            <ul>
            <li>For high memory utilization, check the memory on the operating system level and identify processes causing low memory. If the SQL Server is the cause, execute the attached script to check the memory of the SQL Server and ensure that the Page Life Expectancy has a minimum running value of 300.</li>
            <li>For high CPU utilization, check the CPU and memory on the operating system level. If the CPU utilization is consistently 100% and the SQL Server is the cause, execute the attached script to check the CPU of the SQL Server. Run sp_who or sp_who 'active' to check the running sessions and inform the application team about the statements on Runnable status.</li>
            <li>For backup/restore failures, check the log of the failed backup and address any disk space issues. If the backup fails due to a login request for a non-existing database, verify if the database exists in the instance.</li>
            </ul>

            Please note that these recommendations are based on the provided documents and may need to be further tailored to your specific scenario.
        `,        
        idle: `35.29401398`,
        free: `10GB`,
        iowait: `2`,
        blocked_connections: `5`,
        cache_hit_ratio: `1`
    },
    {
        Id: 3,
        Name: "VD800444",
        Airid: 2614,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Critical",
    },
    {
        Id: 4,        
        Name: "VD800446",
        Airid: 2614,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Unhealthy",
    },
    {
        Id: 5,        
        Name: "VD801057",
        Airid: 2614,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Healthy",
    },
    {
        Id: 6,        
        Name: "VD801496",
        Airid: 2614,
        WindowsVerion: "11", 
        SQLVersion: "14", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Healthy",
    },
    {
        Id: 7,
        Name: "VD801766",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Healthy"
    },
    {
        Id: 8,        
        Name: "VD807005",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Unhealthy"
    },
    {
        Id: 9,        
        Name: "VD806952",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "database",
        Health: "Critical"
    },
    {
        Id: 10,        
        Name: "VD806969",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "application",
        Health: "Healthy"
    },
    {
        Id: 11,        
        Name: "VD801767",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "application",
        Health: "Critical"
    },
    {
        Id: 12,        
        Name: "VD130399",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "application",
        Health: "Unhealthy"
    },
    {
        Id: 13,        
        Name: "VD806951",
        Airid: 2701,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "web",
        Health: "Healthy"
    },
    {
        Id: 14,        
        Name: "VD130374",
        Airid: 2700,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "Database",
        Health: "Unhealthy",
        Insights:`
            Based on the provided data for server VD130374, here are some insights:

            <ul>
            <li>The average CPU idle is 10.29401398.</li>
            <li>The average free memory is 23GB.</li>
            <li>The average CPU input/output wait time is 0.</li>
            <li>The average number of blocked connections is 1.</li>
            <li>The average buffer cache hit ratio is 1.</li>
            </ul>

            Please note that without additional context or thresholds for these metrics, it is difficult to determine the health status of the server. If you have any specific questions or need further assistance, please let me know.
        `,
        Recommendations:`
            Based on the provided context, here are some recommendations for the unhealthy or critical states:

            <ul>
            <li>For high CPU utilization:
                <ul>
                <li>Check CPU and Memory on the Operating System Level by launching the Windows Task Manager > Performance.</li>
                <li>Check what processes are currently running if the CPU Utilization is consistently 100%.</li>
                <li>Reassign the ticket to the appropriate support group if the processes causing high CPU are not related to SQL Server.</li>
                </ul>
            </li>
            <li>For high memory utilization:
                <ul>
                <li>Check Memory on the Operating System Level by launching the Task Manager > Performance tab.</li>
                <li>If the Memory Usage is consistently high, check what processes are running during that time.</li>
                <li>If other processes are causing low memory, ask for further assistance from the appropriate support group.</li>
                </ul>
            </li>
            <li>For backup/restore failures:
                <ul>
                <li>Check the log of the failed backup.</li>
                <li>If the backup job fails due to disk space issues, check for old backups that can be deleted or find a temporary drive with enough disk space.</li>
                <li>If the backup fails due to the database not existing in the instance, inform the application team.</li>
                <li>If the restore fails, check the log of the failed restore and inform the application team accordingly.</li>
                </ul>
            </li>
            </ul>
            
            Please note that these recommendations are based on the provided document. For more details, you can refer to the document: [SOP for Common Incidents_Demo.docx].
            
            If you have any further questions or need additional assistance, please let me know.
        `,
        idle: `10.29401398`,
        free: `23GB`,
        iowait: `0`,
        blocked_connections: `1`,
        cache_hit_ratio: `1`
    },
    {
        Id: 15,        
        Name: "VD807006",
        Airid: 2700,
        WindowsVerion: "11", 
        SQLVersion: "16", 
        CPU: "core 32",
        Memory: 16,
        Type: "Application",
        Health: "Critical",
        Insights: `
            Based on the provided data for server VD807006, here are some insights:

            <ul>
            <li>The average CPU idle is 85.29%, which indicates that the server is healthy.</li>
            <li>The average free memory is 23GB, which is greater than 20% of the total RAM (32GB), indicating that the server is healthy.</li>
            <li>The average CPU I/O wait is 0, which is below the threshold of 10 seconds, indicating that the server is healthy.</li>
            <li>The average number of blocked connections is 0, indicating that the server is healthy.</li>
            <li>The average buffer cache hit ratio is 1, which is above the threshold of 0.89, indicating that the server is healthy.</li>
            </ul>
            
            Overall, based on the metrics provided, server VD807006 is in a healthy state.
        `,
        Recommendations: `
            Based on the provided document, here are some recommendations for the unhealthy or critical states:

            <ul>
            <li>High CPU Utilization:
                <ul>
                <li>Check CPU and Memory on the Operating System Level by launching the Windows Task Manager > Performance.</li>
                <li>If the CPU Usage is consistently 100%, check what processes are currently running in the Task Manager > Processes tab.</li>
                <li>If the processes causing high CPU are not related to SQL Server, reassign the ticket to the appropriate support group.</li>
                <li>If SQL Server is causing the high CPU, further investigate using SSMS and check the statements on Runnable status. Inform the application team about the findings.</li>
                <li>Run sp_who or sp_who 'active' to check the currently running sessions.</li>
                <li>If the application team requests specific queries under Runnable status, select the SPID and run dbcc inputbuffer (SPID). Share the results with the application team.</li>
                <li>Provide the application team with CPU expensive queries by running the attached script.</li>
                </ul>
            </li>
            <li>High Memory Utilization:
                <ul>
                <li>Check Memory on the Operating System Level by launching the Task Manager > Performance tab.</li>
                <li>If the Memory Usage is consistently 91-100%, check what processes are running during that time in Task Manager > Processes > Memory.</li>
                <li>If other processes are causing low memory besides SQL Server, reassign the ticket to the appropriate support group.</li>
                <li>If SQL Server is causing low memory, execute the attached script to check the Memory of the SQL Server.</li>
                <li>Check the Memory usage of SQL Server and cross-check with the memory pinned to SQL.</li>
                <li>Check that the Page Life Expectancy has a minimum running value of 300.</li>
                <li>If other processes are causing low memory, seek help from the appropriate support group for further checking on the OS level.</li>
                </ul>
            </li>
            <li>Backup/Restore Failures:
                <ul>
                <li>Check the log of the failed backup.</li>
                <li>If the backup job fails due to a disk space issue, check if there are old backups that can be deleted. If not, look for a drive with enough disk space and advise the application team to retry the backup using that drive as the new backup location.</li>
                <li>If the backup fails due to the error "Cannot open database 'database name' requested by the login," check if the database exists in the instance.</li>
                </ul>
            </li>
            </ul>
            
            Please note that these recommendations are based on the provided document and may need further investigation or customization based on the specific scenario.
        `,
        idle: `85.29401398`,
        free: `23GB`,
        iowait: `0`,
        blocked_connections: `0`,
        cache_hit_ratio: `1`
    }
]