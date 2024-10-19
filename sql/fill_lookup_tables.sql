USE hy_business;

INSERT INTO
    admin (username, password)
VALUES (
        'admin',
        '$2a$10$QOlOettyefpstTAuk4Gzi.zOr0hB.a1Gm2gB52pOwAs.K4yo7iFPO'
    );

INSERT INTO
    tech_skills_lookup (`name`)
VALUES ('Python'),
    ('JavaScript'),
    ('Java'),
    ('C#'),
    ('C++'),
    ('C'),
    ('Swift'),
    ('Kotlin'),
    ('Ruby'),
    ('PHP'),
    ('TypeScript'),
    ('R'),
    ('React'),
    ('Angular'),
    ('Vue.js'),
    ('Node.js'),
    ('Django'),
    ('Flask'),
    ('Laravel'),
    ('Ruby on Rails'),
    ('ASP.NET'),
    ('SwiftUI'),
    ('UIKit'),
    ('Android Studio'),
    ('React Native'),
    ('Flutter'),
    ('Xamarin'),
    ('Ionic'),
    ('MySQL'),
    ('PostgreSQL'),
    ('MongoDB'),
    ('SQLite'),
    ('Oracle'),
    ('SQL Server'),
    ('Redis'),
    ('Cassandra'),
    ('AWS'),
    ('Azure'),
    ('Google Cloud Platform'),
    ('AWS Lambda'),
    ('Azure Functions'),
    ('Google Cloud Functions'),
    ('Terraform'),
    ('CloudFormation'),
    ('Docker'),
    ('Kubernetes'),
    ('Jenkins'),
    ('GitLab CI'),
    ('CircleCI'),
    ('Ansible'),
    ('Puppet'),
    ('Chef'),
    ('Nagios'),
    ('Prometheus'),
    ('Grafana'),
    ('TCP/IP'),
    ('DNS'),
    ('DHCP'),
    ('BGP'),
    ('OSPF'),
    ('Routers'),
    ('Switches'),
    ('Firewalls'),
    ('TensorFlow'),
    ('PyTorch'),
    ('Scikit-learn'),
    ('Keras'),
    ('Tableau'),
    ('Power BI'),
    ('Matplotlib'),
    ('Seaborn'),
    ('Apache Spark'),
    ('Wireshark'),
    ('Nmap'),
    ('Nessus'),
    ('Metasploit'),
    ('Kali Linux'),
    ('Snort'),
    ('Burp Suite'),
    ('OWASP ZAP'),
    ('Splunk'),
    ('Git'),
    ('GitHub'),
    ('Bitbucket'),
    ('Figma'),
    ('Sketch'),
    ('Adobe XD'),
    ('InVision'),
    ('SAP'),
    ('Salesforce'),
    ('HubSpot'),
    ('Microsoft Dynamics'),
    ('Oracle ERP'),
    ('Tableau'),
    ('Power BI'),
    ('VMware'),
    ('Hyper-V'),
    ('Apache Kafka'),
    ('ELK Stack'),
    ('Nginx'),
    ('Apache HTTP Server'),
    ('Go'),
    ('Perl'),
    ('Scala'),
    ('MATLAB'),
    ('Dart'),
    ('Spring Boot'),
    ('Express.js'),
    ('Svelte'),
    ('Next.js'),
    ('Nuxt.js'),
    ('Gatsby'),
    ('Quarkus'),
    ('Hadoop'),
    ('Spark Streaming'),
    ('Cypress'),
    ('JUnit'),
    ('TestNG'),
    ('Mocha'),
    ('Chai'),
    ('Jest'),
    ('Postman'),
    ('Appium'),
    ('Detox'),
    ('JMeter'),
    ('Travis CI'),
    ('Bamboo'),
    ('TeamCity'),
    ('Spinnaker'),
    ('Argo CD'),
    ('Vault'),
    ('Pulumi'),
    ('OpenShift'),
    ('Alibaba Cloud'),
    ('DigitalOcean'),
    ('IBM Cloud'),
    ('Cisco IOS'),
    ('Juniper Junos'),
    ('Nagios'),
    ('PRTG'),
    ('GraphQL'),
    ('WebSockets'),
    ('Blockchain'),
    ('Internet of Things (IoT)'),
    ('AR/VR Development'),
    ('Game Development'),
    ('Unity'),
    ('Unreal Engine');

INSERT INTO
    tech_skills_lookup (`name`)
VALUES ('Julia'),
    ('Haskell'),
    ('TypeScript'),
    ('CoffeeScript'),
    ('Shell Scripting'),
    ('Laravel'),
    ('Ruby on Rails'),
    ('Django'),
    ('Flask'),
    ('ASP.NET Core'),
    ('Meteor.js'),
    ('FastAPI'),
    ('Phoenix'),
    ('React Router'),
    ('Three.js'),
    ('Robot Framework'),
    ('Cucumber'),
    ('Gatling'),
    ('Locust'),
    ('Katalon Studio'),
    ('RestAssured'),
    ('GitLab CI/CD'),
    ('CircleCI'),
    ('Octopus Deploy'),
    ('Chef'),
    ('Puppet'),
    ('SaltStack'),
    ('Heroku'),
    ('Netlify'),
    ('Vercel'),
    ('IBM Watson'),
    ('AWS ECS'),
    ('AWS EKS'),
    ('Cloudflare'),
    ('Zabbix'),
    ('Mikrotik'),
    ('Cisco Meraki'),
    ('F5 Load Balancer'),
    ('Apache Airflow'),
    ('Apache Kafka'),
    ('Apache NiFi'),
    ('Talend'),
    ('Apache Flink'),
    ('Cassandra'),
    ('Elasticsearch'),
    ('Presto'),
    ('Hive'),
    ('Pig'),
    ('Computer Vision'),
    (
        'Natural Language Processing (NLP)'
    ),
    ('Quantum Computing'),
    ('Edge Computing'),
    ('Chatbot Development'),
    ('IoT Development'),
    ('Microservices Architecture'),
    ('Serverless Architecture'),
    ('Agile Methodologies'),
    ('Scrum'),
    ('Kanban'),
    ('Solidity'),
    ('Elixir'),
    ('F#'),
    ('Crystal'),
    ('Scheme'),
    ('NestJS'),
    ('Vuex'),
    ('Redux'),
    ('jQuery'),
    ('Backbone.js'),
    ('Foundation'),
    ('Bulma'),
    ('Selenium Grid'),
    ('Postman/Newman'),
    ('Katalon Recorder'),
    ('TestCafe'),
    ('Mockoon'),
    ('MockServer'),
    ('GitHub Actions'),
    ('Azure DevOps'),
    ('Bitbucket Pipelines'),
    ('Harness'),
    ('Codefresh'),
    ('AWS CloudFormation'),
    ('Google Cloud Functions'),
    ('Azure DevOps Services'),
    ('IBM Cloud Foundry'),
    ('Salesforce'),
    ('Netcat'),
    ('tcpdump'),
    ('OpenVPN'),
    ('Cisco Packet Tracer'),
    ('DataRobot'),
    ('H2O.ai'),
    ('Amazon Redshift Spectrum'),
    ('Apache Drill'),
    ('Kinesis'),
    ('Apache Kafka Streams'),
    ('Apache Superset'),
    ('Apache Druid'),
    ('KNIME'),
    ('RapidMiner'),
    ('Orange'),
    ('IBM Watson Studio'),
    ('Google AutoML'),
    ('Digital Marketing'),
    ('SEO'),
    ('Web Accessibility (a11y)'),
    ('User Research'),
    ('UX Writing'),
    (
        'Business Intelligence Tools (like QlikView)'
    ),
    ('Data Governance'),
    (
        'Data Privacy Regulations (GDPR, CCPA)'
    ),
    ('Disaster Recovery Planning'),
    ('Incident Response'),
    ('Rust'),
    ('Objective-C'),
    ('Ada'),
    ('Pascal'),
    ('Gatsby'),
    ('Nuxt.js'),
    ('Sapper'),
    ('Hugo'),
    ('Ember.js'),
    ('Laravel Nova'),
    ('Cypress.io'),
    ('Appium Studio'),
    ('RestSharp'),
    ('SoapUI Pro'),
    ('Playwright'),
    ('Spinnaker'),
    ('Jenkins X'),
    ('GitOps'),
    ('ArgoCD'),
    ('DigitalOcean'),
    ('Linode'),
    ('Heroku CI'),
    ('Cloud Foundry'),
    ('Cisco Prime'),
    ('Nagios XI'),
    ('Apache Pulsar'),
    ('Airflow'),
    ('dbt (data build tool)'),
    ('Looker'),
    ('Apache NiFi'),
    ('Cloudera'),
    ('MapR'),
    ('Apache Couchbase'),
    ('TensorBoard'),
    ('Hugging Face'),
    (
        'ONNX (Open Neural Network Exchange)'
    ),
    ('Change Management'),
    ('ITIL Framework'),
    ('Scrum Master Certification'),
    ('Data Migration Strategies'),
    ('Technical Documentation'),
    ('Open Source Contributions'),
    ('Social Media Management'),
    ('Agile Coaching'),
    (
        'MEAN Stack (MongoDB, Express.js, Angular, Node.js)'
    ),
    (
        'MERN Stack (MongoDB, Express.js, React, Node.js)'
    ),
    (
        'LAMP Stack (Linux, Apache, MySQL, PHP)'
    ),
    (
        'LEMP Stack (Linux, Nginx, MySQL, PHP)'
    ),
    (
        'Django Stack (Django, PostgreSQL, Python)'
    ),
    (
        'JAMstack (JavaScript, APIs, Markup)'
    ),
    (
        'Ruby on Rails Stack (Ruby, Rails, PostgreSQL)'
    ),
    (
        'Serverless Stack (AWS Lambda, API Gateway, DynamoDB)'
    ),
    (
        'Data Science Stack (Python, R, SQL, Jupyter)'
    ),
    ('Dart'),
    ('Racket'),
    ('Nim'),
    ('COBOL'),
    ('Smalltalk'),
    ('Flask-RESTful'),
    ('Spring Boot'),
    ('Quasar Framework'),
    ('Chakra UI'),
    ('Material-UI'),
    ('JUnit 5'),
    ('Robot Framework'),
    ('Gatling'),
    ('Gauge'),
    ('Octopus Deploy'),
    ('Wercker'),
    ('Drone CI'),
    ('Alibaba Cloud'),
    (
        'Oracle Cloud Infrastructure (OCI)'
    ),
    ('IBM Cloud Pak'),
    (
        'Kubernetes as a Service (KaaS)'
    ),
    (
        'SolarWinds Network Performance Monitor'
    ),
    ('OpenWrt'),
    ('Zabbix'),
    ('Talend Open Studio'),
    ('Apache Airflow'),
    (
        'Kettle (Pentaho Data Integration)'
    ),
    ('Apache Flink'),
    ('Apache Beam'),
    ('Presto'),
    ('Tidyverse'),
    ('Scikit-image'),
    ('Shiny'),
    ('Dataiku'),
    ('Change Management'),
    ('Vendor Management'),
    ('Supply Chain Management'),
    ('Remote Team Collaboration'),
    ('Digital Transformation'),
    (
        'Customer Experience Management (CEM)'
    );

DELETE FROM tech_skills_lookup
WHERE
    id IN (
        SELECT id
        FROM (
                SELECT id, ROW_NUMBER() OVER (
                        PARTITION BY
                            name
                        ORDER BY id
                    ) AS RN
                FROM tech_skills_lookup
            ) AS subquery
        WHERE
            RN > 1
    );

INSERT INTO
    country_lookup (name, region)
VALUES ('afghanistan', 'asia'),
    ('albania', 'europe'),
    ('algeria', 'africa'),
    ('andorra', 'europe'),
    ('angola', 'africa'),
    (
        'antigua and barbuda',
        'caribbean'
    ),
    ('argentina', 'south america'),
    ('armenia', 'asia'),
    ('australia', 'oceania'),
    ('austria', 'europe'),
    ('azerbaijan', 'asia'),
    ('bahamas', 'caribbean'),
    ('bahrain', 'asia'),
    ('bangladesh', 'asia'),
    ('barbados', 'caribbean'),
    ('belarus', 'europe'),
    ('belgium', 'europe'),
    ('belize', 'central america'),
    ('benin', 'africa'),
    ('bhutan', 'asia'),
    ('bolivia', 'south america'),
    (
        'bosnia and herzegovina',
        'europe'
    ),
    ('botswana', 'africa'),
    ('brazil', 'south america'),
    ('brunei', 'asia'),
    ('bulgaria', 'europe'),
    ('burkina faso', 'africa'),
    ('burundi', 'africa'),
    ('cabo verde', 'africa'),
    ('cambodia', 'asia'),
    ('cameroon', 'africa'),
    ('canada', 'north america'),
    (
        'central african republic',
        'africa'
    ),
    ('chad', 'africa'),
    ('chile', 'south america'),
    ('china', 'asia'),
    ('colombia', 'south america'),
    ('comoros', 'africa'),
    (
        'congo, democratic republic of the',
        'africa'
    ),
    (
        'congo, republic of the',
        'africa'
    ),
    (
        'costa rica',
        'central america'
    ),
    ('croatia', 'europe'),
    ('cuba', 'caribbean'),
    ('cyprus', 'asia'),
    ('czech republic', 'europe'),
    ('denmark', 'europe'),
    ('djibouti', 'africa'),
    ('dominica', 'caribbean'),
    (
        'dominican republic',
        'caribbean'
    ),
    ('ecuador', 'south america'),
    ('egypt', 'africa'),
    (
        'el salvador',
        'central america'
    ),
    ('equatorial guinea', 'africa'),
    ('eritrea', 'africa'),
    ('estonia', 'europe'),
    ('eswatini', 'africa'),
    ('ethiopia', 'africa'),
    ('fiji', 'oceania'),
    ('finland', 'europe'),
    ('france', 'europe'),
    ('gabon', 'africa'),
    ('gambia', 'africa'),
    ('georgia', 'asia'),
    ('germany', 'europe'),
    ('ghana', 'africa'),
    ('greece', 'europe'),
    ('grenada', 'caribbean'),
    (
        'guatemala',
        'central america'
    ),
    ('guinea', 'africa'),
    ('guinea-bissau', 'africa'),
    ('guyana', 'south america'),
    ('haiti', 'caribbean'),
    ('honduras', 'central america'),
    ('hungary', 'europe'),
    ('iceland', 'europe'),
    ('india', 'asia'),
    ('indonesia', 'asia'),
    ('iran', 'asia'),
    ('iraq', 'asia'),
    ('ireland', 'europe'),
    ('israel', 'asia'),
    ('italy', 'europe'),
    ('jamaica', 'caribbean'),
    ('japan', 'asia'),
    ('jordan', 'asia'),
    ('kazakhstan', 'asia'),
    ('kenya', 'africa'),
    ('kiribati', 'oceania'),
    ('korea, north', 'asia'),
    ('korea, south', 'asia'),
    ('kuwait', 'asia'),
    ('kyrgyzstan', 'asia'),
    ('laos', 'asia'),
    ('latvia', 'europe'),
    ('lebanon', 'asia'),
    ('lesotho', 'africa'),
    ('liberia', 'africa'),
    ('libya', 'africa'),
    ('liechtenstein', 'europe'),
    ('lithuania', 'europe'),
    ('luxembourg', 'europe'),
    ('madagascar', 'africa'),
    ('malawi', 'africa'),
    ('malaysia', 'asia'),
    ('maldives', 'asia'),
    ('mali', 'africa'),
    ('malta', 'europe'),
    ('marshall islands', 'oceania'),
    ('mauritania', 'africa'),
    ('mauritius', 'africa'),
    ('mexico', 'north america'),
    ('micronesia', 'oceania'),
    ('moldova', 'europe'),
    ('monaco', 'europe'),
    ('mongolia', 'asia'),
    ('montenegro', 'europe'),
    ('morocco', 'africa'),
    ('mozambique', 'africa'),
    ('myanmar', 'asia'),
    ('namibia', 'africa'),
    ('nauru', 'oceania'),
    ('nepal', 'asia'),
    ('netherlands', 'europe'),
    ('new zealand', 'oceania'),
    (
        'nicaragua',
        'central america'
    ),
    ('niger', 'africa'),
    ('nigeria', 'africa'),
    ('north macedonia', 'europe'),
    ('norway', 'europe'),
    ('oman', 'asia'),
    ('pakistan', 'asia'),
    ('palau', 'oceania'),
    ('palestine', 'asia'),
    ('panama', 'central america'),
    ('papua new guinea', 'oceania'),
    ('paraguay', 'south america'),
    ('peru', 'south america'),
    ('philippines', 'asia'),
    ('poland', 'europe'),
    ('portugal', 'europe'),
    ('qatar', 'asia'),
    ('romania', 'europe'),
    ('russia', 'europe'),
    ('rwanda', 'africa'),
    (
        'saint kitts and nevis',
        'caribbean'
    ),
    ('saint lucia', 'caribbean'),
    (
        'saint vincent and the grenadines',
        'caribbean'
    ),
    ('samoa', 'oceania'),
    ('san marino', 'europe'),
    (
        'sao tome and principe',
        'africa'
    ),
    ('saudi arabia', 'asia'),
    ('senegal', 'africa'),
    ('serbia', 'europe'),
    ('singapore', 'asia'),
    ('slovakia', 'europe'),
    ('slovenia', 'europe'),
    ('solomon islands', 'oceania'),
    ('somalia', 'africa'),
    ('south africa', 'africa'),
    ('south sudan', 'africa'),
    ('spain', 'europe'),
    ('sri lanka', 'asia'),
    ('sudan', 'africa'),
    ('suriname', 'south america'),
    ('sweden', 'europe'),
    ('switzerland', 'europe'),
    ('syria', 'asia'),
    ('taiwan', 'asia'),
    ('tajikistan', 'asia'),
    ('tanzania', 'africa'),
    ('thailand', 'asia'),
    ('togo', 'africa'),
    ('tonga', 'oceania'),
    (
        'trinidad and tobago',
        'caribbean'
    ),
    ('tunisia', 'africa'),
    ('turkey', 'asia'),
    ('turkmenistan', 'asia'),
    ('tuvalu', 'oceania'),
    ('uganda', 'africa'),
    ('ukraine', 'europe'),
    (
        'united arab emirates',
        'asia'
    ),
    ('united kingdom', 'europe'),
    (
        'united states',
        'north america'
    ),
    ('uruguay', 'south america'),
    ('uzbekistan', 'asia'),
    ('vanuatu', 'oceania'),
    ('vatican city', 'europe'),
    ('venezuela', 'south america'),
    ('vietnam', 'asia'),
    ('yemen', 'asia'),
    ('zambia', 'africa'),
    ('zimbabwe', 'africa');

INSERT INTO
    `languages_lookup` (`name`)
VALUES ('Afar'),
    ('Abkhazian'),
    ('Avestan'),
    ('Afrikaans'),
    ('Akan'),
    ('Amharic'),
    ('Aragonese'),
    ('Arabic'),
    ('Assamese'),
    ('Avaric'),
    ('Aymara'),
    ('Azerbaijani'),
    ('Bashkir'),
    ('Belarusian'),
    ('Bulgarian'),
    ('Bislama'),
    ('Bambara'),
    ('Bengali'),
    ('Tibetan'),
    ('Breton'),
    ('Bosnian'),
    ('Catalan'),
    ('Chechen'),
    ('Chamorro'),
    ('Corsican'),
    ('Cree'),
    ('Czech'),
    ('Old Slavonic'),
    ('Chuvash'),
    ('Welsh'),
    ('Danish'),
    ('German'),
    ('Maldivian'),
    ('Dzongkha'),
    ('Ewe'),
    ('Greek'),
    ('English'),
    ('Esperanto'),
    ('Spanish'),
    ('Estonian'),
    ('Basque'),
    ('Persian'),
    ('Fulah'),
    ('Finnish'),
    ('Fijian'),
    ('Faroese'),
    ('French'),
    ('Western Frisian'),
    ('Irish'),
    ('Gaelic'),
    ('Galician'),
    ('Guarani'),
    ('Gujarati'),
    ('Manx'),
    ('Hausa'),
    ('Hebrew'),
    ('Hindi'),
    ('Hiri Motu'),
    ('Croatian'),
    ('Haitian'),
    ('Hungarian'),
    ('Armenian'),
    ('Herero'),
    ('Interlingua'),
    ('Indonesian'),
    ('Interlingue'),
    ('Igbo'),
    ('Sichuan Yi'),
    ('Inupiaq'),
    ('Ido'),
    ('Icelandic'),
    ('Italian'),
    ('Inuktitut'),
    ('Japanese'),
    ('Javanese'),
    ('Georgian'),
    ('Kongo'),
    ('Kikuyu'),
    ('Kwanyama'),
    ('Kazakh'),
    ('Greenlandic'),
    ('Central Khmer'),
    ('Kannada'),
    ('Korean'),
    ('Kanuri'),
    ('Kashmiri'),
    ('Kurdish'),
    ('Komi'),
    ('Cornish'),
    ('Kirghiz'),
    ('Latin'),
    ('Luxembourgish'),
    ('Ganda'),
    ('Limburgish'),
    ('Lingala'),
    ('Lao'),
    ('Lithuanian'),
    ('Luba-Katanga'),
    ('Latvian'),
    ('Malagasy'),
    ('Marshallese'),
    ('Maori'),
    ('Macedonian'),
    ('Malayalam'),
    ('Mongolian'),
    ('Marathi'),
    ('Malay'),
    ('Maltese'),
    ('Burmese'),
    ('Nauru'),
    ('Norwegian'),
    ('North Ndebele'),
    ('Nepali'),
    ('Ndonga'),
    ('Dutch'),
    ('Norwegian Nynorsk'),
    ('Norwegian'),
    ('South Ndebele'),
    ('Navajo'),
    ('Nyanja'),
    ('Occitan'),
    ('Ojibwa'),
    ('Oromo'),
    ('Oriya'),
    ('Ossetic'),
    ('Punjabi'),
    ('Pali'),
    ('Polish'),
    ('Pashto'),
    ('Portuguese'),
    ('Quechua'),
    ('Romansh'),
    ('Rundi'),
    ('Romanian'),
    ('Russian'),
    ('Kinyarwanda'),
    ('Sanskrit'),
    ('Sardinian'),
    ('Sindhi'),
    ('Northern Sami'),
    ('Sango'),
    ('Sinhalese'),
    ('Slovak'),
    ('Slovenian'),
    ('Samoan'),
    ('Shona'),
    ('Somali'),
    ('Albanian'),
    ('Serbian'),
    ('Swati'),
    ('Southern Sotho'),
    ('Sundanese'),
    ('Swedish'),
    ('Swahili'),
    ('Tamil'),
    ('Telugu'),
    ('Tajik'),
    ('Thai'),
    ('Tigrinya'),
    ('Turkmen'),
    ('Tagalog'),
    ('Tswana'),
    ('Tonga'),
    ('Turkish'),
    ('Tsonga'),
    ('Tatar'),
    ('Twi'),
    ('Tahitian'),
    ('Uighur'),
    ('Ukrainian'),
    ('Urdu'),
    ('Uzbek'),
    ('Venda'),
    ('Vietnamese'),
    ('Volapük'),
    ('Walloon'),
    ('Wolof'),
    ('Xhosa'),
    ('Yiddish'),
    ('Yoruba'),
    ('Zhuang'),
    ('Chinese'),
    ('Zulu');