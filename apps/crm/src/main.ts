import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dynamoose from 'dynamoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //filtroGlobal
  app.useGlobalFilters(new AllExceptionsFilter());
  //swagger
  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('The crm API description')
    .setVersion('1.0')
    .addTag('CRM API Docs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //cors
  app.enableCors({
    origin: '*', // Ou especifique a origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 4000);

  //hotReload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  //dynamoDb  
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process?.env?.AWS_ACCESS_KEY_ID,
      secretAccessKey: process?.env?.AWS_ACCESS_KEY
    },
    region: process?.env?.AWS_REGION
  });

  // dynamoose.aws.ddb.local();
  dynamoose.aws.ddb.set(ddb);
}
bootstrap();
