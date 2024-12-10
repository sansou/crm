import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dynamoose from 'dynamoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger
  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('The crm API description')
    .setVersion('1.0')
    .addTag('crm')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);

  //hotReload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  //dynamoose
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process?.env?.AWS_ACCESS_KEY_ID,
      secretAccessKey: process?.env?.AWS_ACCESS_SECRET
    },
    region: process?.env?.AWS_REGION
  });

  dynamoose.aws.ddb.local();
}
bootstrap();
