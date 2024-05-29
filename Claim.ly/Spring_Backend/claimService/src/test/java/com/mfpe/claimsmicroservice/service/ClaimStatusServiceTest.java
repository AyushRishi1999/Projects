package com.mfpe.claimsmicroservice.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.mfpe.claimsmicroservice.dto.ClaimStatusDTO;
import com.mfpe.claimsmicroservice.exceptions.InvalidClaimIdException;
import com.mfpe.claimsmicroservice.model.Claim;
import com.mfpe.claimsmicroservice.repository.ClaimRepo;

@SpringBootTest
class ClaimStatusServiceTest {

	@Autowired
	ClaimStatusService claimStatusService;
	@MockBean
	ClaimRepo claimRepo;
	@Test
	@DisplayName("Checking if ClaimStatusService class is loading or not")
	void claimStatusServiceIsLoadedOrNot() {
		assertThat(claimStatusService).isNotNull();
	}
	
	@Test
	@DisplayName("Checking if getClaimStatus method is working or not with valid Id")
	void getClaimStatusTestWithValidId() {
		ClaimStatusDTO claimStatusDTO=new ClaimStatusDTO();
		claimStatusDTO.setClaimId("Claim_001");
		claimStatusDTO.setClaimStatus("Pending Action");
		claimStatusDTO.setClaimDescription("All the fields are successfully verified! Please wait for furthur action");
		
		Optional<Claim> claim = claimRepo.findHospitalIdByclaimId("Claim_001");		
		
		when(claim.get().getStatus()).thenReturn("Pending Action");
		when(claim.get().getDescription()).thenReturn("All the fields are successfully verified! Please wait for furthur action");
		
		
		assertEquals(claimStatusDTO.getClaimId(), claimStatusService.getClaimStatus("Claim_001").getBody().getClaimId()); 
		assertEquals(claimStatusDTO.getClaimStatus(), claimStatusService.getClaimStatus("Claim_001").getBody().getClaimStatus()); 
		assertEquals(claimStatusDTO.getClaimDescription(), claimStatusService.getClaimStatus("Claim_001").getBody().getClaimDescription()); 
	}
	
	@Test
	@DisplayName("Checking if getClaimStatus method is working or not with Invalid Id")
	void testGetClaimStatusWithInvalidValidId() {
		
		assertThrows(InvalidClaimIdException.class, () ->
         claimStatusService.getClaimStatus("Claim_1561"));
	}
	
	
}
