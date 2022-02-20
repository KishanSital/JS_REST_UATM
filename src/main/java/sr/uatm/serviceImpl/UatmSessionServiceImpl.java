package sr.uatm.serviceImpl;


import sr.uatm.designpatterns.creational.builder.entities.uatm.User;
import sr.uatm.services.UatmSessionService;

public class UatmSessionServiceImpl implements UatmSessionService {

    public static User user = new User();
    public static boolean loginStatus = false;

    public UatmSessionServiceImpl(User user) {
        this.user = user;
    }
}
