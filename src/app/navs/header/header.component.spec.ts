import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { SessionService } from 'src/app/core/services/session.service';

describe('HeaderComponent', () => {
  let sessionService: jasmine.SpyObj<SessionService>;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: SessionService, useValue: sessionServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    sessionService.getUser.and.returnValue({
      id: 1,
      name: 'Alfred Reynolds',
      email: 'Karlie.Nolan2@hotmail.com',
      avatar: 'https://cdn.fakercloud.com/avatars/mcflydesign_128.jpg',
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
